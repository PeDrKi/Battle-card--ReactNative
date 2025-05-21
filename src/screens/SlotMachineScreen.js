import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getPlayerCurrency, updatePlayerCurrency } from '../utils/CurrencyManager';
import { useCallback } from 'react';

const slotItems = [
  require('../../assets/images/slots/1.png'),
  require('../../assets/images/slots/2.png'),
  require('../../assets/images/slots/3.png'),
  require('../../assets/images/slots/4.png'),
  require('../../assets/images/slots/5.png'),
  require('../../assets/images/slots/6.png'),
  require('../../assets/images/slots/7.png'),
  require('../../assets/images/slots/8.png'),
  require('../../assets/images/slots/9.png'),
  require('../../assets/images/slots/10.png'),
  require('../../assets/images/slots/11.png'),
  require('../../assets/images/slots/12.png'),
  require('../../assets/images/slots/13.png'),
  require('../../assets/images/slots/14.png'),
  require('../../assets/images/slots/15.png'),
  require('../../assets/images/slots/16.png'),
  require('../../assets/images/slots/17.png'),
  require('../../assets/images/slots/18.png'),
  require('../../assets/images/slots/19.png'),
  require('../../assets/images/slots/20.png'),
  require('../../assets/images/slots/21.png'),
  require('../../assets/images/slots/22.png'),
  require('../../assets/images/slots/23.png'),
  require('../../assets/images/slots/24.png'),
  require('../../assets/images/slots/25.png'),
  require('../../assets/images/slots/26.png'),
  require('../../assets/images/slots/27.png'),
  require('../../assets/images/slots/28.png'),
  require('../../assets/images/slots/29.png'),
  require('../../assets/images/slots/30.png'),
  require('../../assets/images/slots/31.png'),
  require('../../assets/images/slots/32.png'),
  require('../../assets/images/slots/33.png'),
  require('../../assets/images/slots/34.png'),
  require('../../assets/images/slots/35.png'),
  require('../../assets/images/slots/36.png'),
  require('../../assets/images/slots/37.png'),
  require('../../assets/images/slots/38.png'),
  require('../../assets/images/slots/39.png'),
  require('../../assets/images/slots/40.png'),
];

const { width } = Dimensions.get('window');
const itemHeight = 140;
const TOTAL_ITEMS = 10000;

const generateInfiniteSlots = () => {
  const arr = [];
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    arr.push(slotItems[i % slotItems.length]);
  }
  return arr;
};

const SlotColumn = ({ data, scrollRef }) => (
  <FlatList
    ref={scrollRef}
    data={data}
    keyExtractor={(_, index) => index.toString()}
    renderItem={({ item }) => (
      <View style={styles.slotItem}>
        <Image source={item} style={styles.slotImage} resizeMode='contain' />
      </View>
    )}
    showsVerticalScrollIndicator={false}
    scrollEnabled={false}
    getItemLayout={(_, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    })}
    initialScrollIndex={Math.floor(TOTAL_ITEMS / 2)}
  />
);

const SlotMachineScreen = () => {
  const navigation = useNavigation();
  const scrollA = useRef(null);
  const scrollB = useRef(null);
  const scrollC = useRef(null);
  const [playerCurrency, setPlayerCurrency] = useState(100);
  const [columns, setColumns] = useState([
    generateInfiniteSlots(),
    generateInfiniteSlots(),
    generateInfiniteSlots(),
  ]);
  const [result, setResult] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadCurrency = async () => {
        const currency = await getPlayerCurrency();
        setPlayerCurrency(currency);
      };
      loadCurrency();
    }, [])
  );

  const spin = async () => {
    if (playerCurrency < 10) {
      Alert.alert('Not enough coins', 'You need at least 10 coins to spin.');
      return;
    }

    const newCurrency = await updatePlayerCurrency(-10);
    setPlayerCurrency(newCurrency);

    const refs = [scrollA, scrollB, scrollC];
    const finalSymbols = [
      slotItems[Math.floor(Math.random() * slotItems.length)],
      slotItems[Math.floor(Math.random() * slotItems.length)],
      slotItems[Math.floor(Math.random() * slotItems.length)],
    ];

    refs.forEach((ref, i) => {
      setTimeout(() => {
        if (ref.current) {
          const basePosition = (TOTAL_ITEMS / 2) * itemHeight;
          const randomRounds = Math.floor(Math.random() * 30 + 10) * slotItems.length * itemHeight;
          const targetSymbolIndex = slotItems.indexOf(finalSymbols[i]);
          const finalOffset = basePosition + randomRounds + (targetSymbolIndex * itemHeight);

          ref.current.scrollToOffset({
            offset: finalOffset,
            animated: true,
          });
        }
      }, i * 100);
    });

    setTimeout(async () => {
      const [a, b, c] = finalSymbols.map((item) => slotItems.indexOf(item));
      const won = a === b && b === c;
      if (won) {
        const newCurrency = await updatePlayerCurrency(5000);
        setPlayerCurrency(newCurrency);
      }
      setResult(won ? '🎉 Jackpot! (+5000)' : '');
    }, 4000);
  };

  const handleExit = () => {
    navigation.navigate('Home');
  };

  const showRules = () => {
    Alert.alert(
      'Game Rules & Rewards',
      'How to Play:\n- Press the "SPIN" button to start the slot machine.\n- Each spin costs 10 coins.\n- The goal is to align three identical symbols across the three columns.\n\nRewards & Penalties:\n- Win: If all three columns show the same symbol, you win 5000 coins!\n- Loss: If the symbols do not match, you lose the 10 coins spent on the spin.\n- Insufficient Coins: You need at least 10 coins to spin.\n\nWin Probability:\n- The chance of winning (getting three identical symbols) is 0.0625% (or approximately 1 in 1.600 (40^3/40) spins, based on game configuration).\n\nEnjoy the game and good luck!'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Slot Machine</Text>
        <TouchableOpacity onPress={showRules} style={styles.rulesButton}>
          <Text style={styles.rulesButtonText}>?</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.currency}>COINS: {playerCurrency}</Text>
      <Text style={styles.probability}>Win Probability: 0.0625% (1 in 1.600)</Text>

      <View style={styles.slotRow}>
        <SlotColumn data={columns[0]} scrollRef={scrollA} />
        <SlotColumn data={columns[1]} scrollRef={scrollB} />
        <SlotColumn data={columns[2]} scrollRef={scrollC} />
      </View>

      <TouchableOpacity onPress={spin} style={[styles.button, playerCurrency < 10 && styles.buttonDisabled]}>
        <Text style={styles.buttonText}>SPIN (-10)</Text>
      </TouchableOpacity>

      {result && <Text style={styles.result}>{result}</Text>}

      <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  rulesButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  rulesButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 20,
    color: '#f1c40f',
    marginBottom: 10,
  },
  probability: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: itemHeight,
    marginBottom: 30,
  },
  slotItem: {
    height: itemHeight,
    width: width * 0.22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: '#222',
    marginHorizontal: 6,
    overflow: 'hidden',
  },
  slotImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#f39c12',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 14,
  },
  buttonDisabled: {
    backgroundColor: '#888',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  result: {
    marginTop: 30,
    fontSize: 26,
    color: '#fff',
    fontWeight: '600',
  },
  exitButton: {
    marginTop: 30,
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 14,
    alignSelf: 'center',
  },
  exitButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
});

export default SlotMachineScreen;