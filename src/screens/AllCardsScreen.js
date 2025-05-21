import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { APIURL } from '../utils/config';
import { getImageSource } from '../utils/get_image';
import styles from '../screens/styleScreen/AllCardScreen_style';
import { getPlayerCurrency, updatePlayerCurrency } from '../utils/CurrencyManager';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 20;
const cardHeight = cardWidth * 1.75;

export default function AllCardsScreen({ navigation }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playerCurrency, setPlayerCurrency] = useState(100);

  // Làm mới playerCurrency mỗi khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const currency = await getPlayerCurrency();
          setPlayerCurrency(currency);
          const response = await fetch(APIURL);
          const data = await response.json();
          setCards(data);
        } catch (error) {
          alert('Không thể tải danh sách thẻ bài!');
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }, [])
  );

  const unlockCard = async (card) => {
    if (playerCurrency < 100) {
      alert('Không đủ tiền để mở khóa thẻ! Cần 100 coins.');
      return;
    }
    try {
      const newCurrency = await updatePlayerCurrency(-100);
      setPlayerCurrency(newCurrency);

      const response = await fetch(`${APIURL}/unlock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Không thể mở khóa thẻ!');
      }
      const updatedCard = await response.json();

      setCards((prevCards) =>
        prevCards.map((c) => (c.id === updatedCard.id ? updatedCard : c))
      );

      alert(`Đã mở khóa thẻ ${card.name}! Rarity: ${updatedCard.rarity}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/Components/Deck.png')} style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Lore')}>
  <Text style={styles.title}>DECK</Text>
</TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 16, marginBottom: 1 }}>
          COINS: {playerCurrency}
        </Text>
        {loading ? (
          <ActivityIndicator size='large' color='#fff' />
        ) : (
          <FlatList
            data={cards}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const cardContent = (
                <View style={[styles.cardWrapper, { borderRadius: 20, overflow: 'hidden' }]}>
                  <ImageBackground
                    style={styles.card}
                    source={getImageSource(item.name)}
                    resizeMode='cover'
                  >
                    <View style={styles.charaTitle}>
                      <Text style={styles.charaTitleText}>{item.name}</Text>
                    </View>
                    <View style={styles.chara}>
                      {item.name === 'UNLOCK' && item.rarity === 0 && (
                        <View style={styles.mysticOverlay}>
                          <Text style={styles.unlockText}>UNLOCK (100 💰)</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.statusInfo}>
                      <View style={styles.atkInfo}>
                        <Text style={styles.statusText}>{item.attack}</Text>
                      </View>
                      <View style={styles.defInfo}>
                        <Text style={styles.statusText}>{item.defense}</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              );

              return item.name === 'UNLOCK' && item.rarity === 0 ? (
                <TouchableOpacity onPress={() => unlockCard(item)}>
                  {cardContent}
                </TouchableOpacity>
              ) : (
                cardContent
              );
            }}
          />
        )}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('AddCardScreen')} // Bỏ playerCurrency
          disabled={true}
        >
          <Text style={styles.backButtonText}>➕ Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')} // Bỏ playerCurrency
        >
          <Text style={styles.backButtonText}>EXIT</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}