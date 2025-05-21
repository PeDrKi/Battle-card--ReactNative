import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Dimensions, ActivityIndicator, Image, ImageBackground, Animated, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { APIURL } from '../utils/config';
import { getImageSource } from '../utils/get_image';
import { applySpecialAbility } from '../utils/ability';
import styles from './styleScreen/GameScreen_style';
import { randomizeCards } from '../logics/random_logic';
import GameResultModal from '../components/GameResultModal';
import { getPlayerCurrency, updatePlayerCurrency } from '../utils/CurrencyManager';
import { useCallback } from 'react';

const { width, height } = Dimensions.get('window');
const cardWidth = width / 3 - 20;
const cardHeight = cardWidth * 1.75;
const API_URL = APIURL;
const Health = 1000;

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType='fade'
      onRequestClose={onClose}
    >
      <View style={customStyles.overlay}>
        <View style={customStyles.alertContainer}>
          <Text style={customStyles.message}>{message}</Text>
          <TouchableOpacity style={customStyles.button} onPress={onClose}>
            <Text style={customStyles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const customStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    width: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default function GameScreen({ navigation }) {
  const [allCards, setAllCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [aiCards, setAiCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playerHealth, setPlayerHealth] = useState(Health);
  const [aiHealth, setAiHealth] = useState(Health);
  const [aiCard, setAiCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [gameResult, setGameResult] = useState('');
  const [playerCurrency, setPlayerCurrency] = useState(100);
  const [nextCardAttackBonus, setNextCardAttackBonus] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const flipAnimations = useRef(new Map()).current;

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const currency = await getPlayerCurrency();
          setPlayerCurrency(currency);
          const response = await fetch(API_URL);
          const data = await response.json();
          setAllCards(data);
          setPlayerCards(randomizeCards(data));
          setAiCards(randomizeCards(data));
          data.forEach((card) => {
            flipAnimations.set(`ai-${card.id}`, new Animated.Value(0));
          });
          setLoading(false);
        } catch (error) {
          setAlertMessage('Không thể tải danh sách thẻ bài!');
          setAlertVisible(true);
        }
      };
      loadData();
    }, [])
  );

  const handleChooseCard = async (card) => {
    if (playerHealth <= 0 || aiHealth <= 0) return;

    const randomAiCard = aiCards[Math.floor(Math.random() * aiCards.length)];
    setAiCard(randomAiCard);

    Animated.timing(flipAnimations.get(`ai-${randomAiCard.id}`), {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const { modifiedPlayerHealth, modifiedAiHealth, modifiedPlayerAttack, modifiedAiAttack, modifiedAiDefense, modifiedPlayerDefense, nextCardAttackBonus: newBonus, abilityMessage } = applySpecialAbility(
      card,
      randomAiCard,
      playerHealth,
      aiHealth,
      Health,
      nextCardAttackBonus
    );

    let playerDamage = Math.max(0, modifiedPlayerAttack - modifiedAiDefense);
    let aiDamage = Math.max(0, modifiedAiAttack - modifiedPlayerDefense);

    const newPlayerHealth = Math.max(0, modifiedPlayerHealth - aiDamage);
    const newAiHealth = Math.max(0, modifiedAiHealth - playerDamage);

    setPlayerHealth(newPlayerHealth);
    setAiHealth(newAiHealth);
    setNextCardAttackBonus(newBonus);

    let currencyChange = 0;
    if (newAiHealth <= 0) {
      currencyChange = 50;
    } else if (newPlayerHealth <= 0) {
      currencyChange = -20;
    }

    const newCurrency = await updatePlayerCurrency(currencyChange);
    setPlayerCurrency(newCurrency);

    const message = abilityMessage
      ? `${abilityMessage}\nYou: -${aiDamage} HP | BOT: -${playerDamage} HP`
      : `You: -${aiDamage} HP | BOT: -${playerDamage} HP`;

    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    if (playerHealth <= 0) {
      setGameResult('lose');
      setModalVisible(true);
    } else if (aiHealth <= 0) {
      setGameResult('win');
      setModalVisible(true);
    } else {
      setPlayerCards(randomizeCards(allCards));
      setAiCards(randomizeCards(allCards));
      aiCards.forEach((card) => {
        flipAnimations.get(`ai-${card.id}`).setValue(0);
      });
    }
  };

  const restartGame = () => {
    setPlayerHealth(Health);
    setAiHealth(Health);
    setModalVisible(false);
    setNextCardAttackBonus(0);
    setPlayerCards(randomizeCards(allCards));
    setAiCards(randomizeCards(allCards));
    aiCards.forEach((card) => {
      flipAnimations.get(`ai-${card.id}`)?.setValue(0);
    });
  };

  const goToHome = () => {
    setModalVisible(false);
    setNextCardAttackBonus(0);
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={require('../../assets/Components/Backgame.png')}
      style={{ width: '100%', height: '100%' }}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.container}>
        <View style={styles.healthContainer}>
          <Text style={styles.healthText}>YOU: {playerHealth} ❤️</Text>
          <Text style={styles.healthText}>BOT: {aiHealth} ❤️</Text>
        </View>
        <Text style={styles.healthText}>COINS: {playerCurrency} 💰</Text>

        <Text style={styles.title}>BOT'S DECK</Text>
        {loading ? (
          <ActivityIndicator size='large' color='#fff' />
        ) : (
          <FlatList
            data={aiCards}
            numColumns={3}
            keyExtractor={(item) => `ai-${item.id}`}
            renderItem={({ item }) => {
              const isRevealed = aiCard && aiCard.id === item.id;
              const flipAnimation = flipAnimations.get(`ai-${item.id}`);
              const backOpacity = flipAnimation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0, 0],
              });
              const frontOpacity = flipAnimation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0, 1],
              });
              const scale = flipAnimation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.95, 1],
              });

              return (
                <View style={styles.cardBOT}>
                  <Animated.View
                    style={{
                      width: cardWidth,
                      height: cardHeight * 0.95,
                      transform: [{ scale }],
                    }}
                  >
                    <Animated.View style={{ opacity: backOpacity, position: 'absolute', width: '100%', height: '100%' }}>
                      <Image
                        source={require('../../assets/Components/back.png')}
                        style={{
                          padding: 15,
                          marginHorizontal: 5,
                          borderRadius: 10,
                          alignItems: 'center',
                          width: cardWidth,
                          height: cardHeight * 0.95,
                          alignContent: 'center',
                          justifyContent: 'flex-start',
                          borderColor: '#000',
                        }}
                      />
                    </Animated.View>
                    <Animated.View style={{ opacity: frontOpacity, width: '100%', height: '100%' }}>
                      {isRevealed && (
                        <ImageBackground
                          source={getImageSource(item.name)}
                          style={[styles.card, styles.playerCard]}
                          imageStyle={{ borderRadius: 10 }}
                        >
                          <View style={styles.cardname}>
                            <Text style={styles.cardnametxt}>{item.name}</Text>
                          </View>
                          <View style={styles.chara}>
                            <Image source={getImageSource(item.name)} style={styles.charepic} />
                          </View>
                          <View style={styles.statusitem}>
                            <View style={styles.atkInfo}>
                              <Text style={styles.textItemInfo}>{item.attack}</Text>
                            </View>
                            <View style={styles.defInfo}>
                              <Text style={styles.textItemInfo}>{item.defense}</Text>
                            </View>
                          </View>
                        </ImageBackground>
                      )}
                    </Animated.View>
                  </Animated.View>
                </View>
              );
            }}
          />
        )}

        <Text style={styles.title}>YOUR DECK</Text>
        {loading ? (
          <ActivityIndicator size='large' color='#fff' />
        ) : (
          <FlatList
            data={playerCards}
            numColumns={3}
            keyExtractor={(item) => `player-${item.id}`}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.card, styles.playerCard]} onPress={() => handleChooseCard(item)}>
                <ImageBackground
                  source={getImageSource(item.name)}
                  style={[styles.card, styles.playerCard]}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <View style={styles.cardname}>
                    <Text style={styles.cardnametxt}>{item.name}</Text>
                  </View>
                  <View style={styles.chara}>
                    <Image source={getImageSource(item.name)} style={styles.charepic} />
                  </View>
                  <View style={styles.statusitem}>
                    <View style={styles.atkInfo}>
                      <Text style={styles.textItemInfo}>{item.attack}</Text>
                    </View>
                    <View style={styles.defInfo}>
                      <Text style={styles.textItemInfo}>{item.defense}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        )}
        <Text style={{ color: '#fff', marginTop: 10 }}>CHOOSE YOUR CARD</Text>
        <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
          <Text style={styles.exitButtonText}>EXIT</Text>
        </TouchableOpacity>

        <CustomAlert
          visible={alertVisible}
          message={alertMessage}
          onClose={handleAlertClose}
        />
        <GameResultModal
          visible={modalVisible}
          gameResult={gameResult}
          onRestart={restartGame}
          onHome={goToHome}
        />
      </View>
    </ImageBackground>
  );
}