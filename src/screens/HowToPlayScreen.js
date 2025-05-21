import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function HowToPlayScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const playerCurrency = route.params?.playerCurrency || 100;
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Overview</Text>
            <Text style={styles.sectionText}>
              Welcome to the card battle game! Your goal is to defeat the BOT by reducing its health to 0 using your deck of cards. Each player starts with 1000 health points (❤️). Choose cards strategically to outmaneuver your opponent.
            </Text>
          </View>
        );
      case 'mechanic':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Mechanic</Text>
            <Text style={styles.sectionText}>
              - Each card has Attack (⚔️) and Defense (🛡️) stats.{'\n'}
              - When you select a card, it battles a randomly chosen BOT card.{'\n'}
              - Damage is calculated as: Attack - Opponent's Defense (minimum 0).{'\n'}
              - The damage reduces the opponent's health.
            </Text>
          </View>
        );
      case 'abilities':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Abilities</Text>
            <Text style={styles.sectionText}>
              Some cards have unique abilities, activated when played:{'\n'}
              - <Text style={styles.cardName}>World Devourer</Text>: Halves current health.{'\n'}
              - <Text style={styles.cardName}>Rak'khar</Text>: Sets attack to 0.{'\n'}
              - <Text style={styles.cardName}>Grokk Bonenawer</Text>: Reduces defense by 50%.{'\n'}
              - <Text style={styles.cardName}>King Amos</Text>: Boosts next card's attack by 10.{'\n'}
              - <Text style={styles.cardName}>Elf Archer</Text>: +5 attack if your health is below 50.{'\n'}
              - <Text style={styles.cardName}>Abyssal Mage</Text>: Heals you 15 HP and deals 10 damage.{'\n'}
              - <Text style={styles.cardName}>Undead Berserkers</Text>: Doubles attack if defense is below 5.{'\n'}
              - <Text style={styles.cardName}>Paladin Thorne</Text>: Gains +8 defense.{'\n'}
              - <Text style={styles.cardName}>Orc Shaman</Text>: Swaps attack and defense stats.
            </Text>
          </View>
        );
      case 'currency':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Currency System</Text>
            <Text style={styles.sectionText}>
              - Earn coins (💰) to unlock new cards or play the slot machine.{'\n'}
              - Win a game: +5000 coins.{'\n'}
              - Lose a game: -20 coins.{'\n'}
              - Slot Machine: Costs 10 coins per spin, win 5000 coins for matching symbols.
            </Text>
          </View>
        );
      case 'slot':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Slot Machine</Text>
            <Text style={styles.sectionText}>
              - Spin the slot machine to test your luck!{'\n'}
              - Match three identical symbols to win 5000 coins.{'\n'}
              - Each spin costs 10 coins.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Components/Home_background.png')}
      style={styles.container}
      imageStyle={{ resizeMode: 'cover' }}
    >
      {/* <Text style={styles.title}>How to Play</Text> */}
     <Image
        source={require("../../assets/Components/HTP.png")}
        style={styles.button}
        resizeMode="contain"
    />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'mechanic' && styles.activeTab]}
          onPress={() => setActiveTab('mechanic')}
        >
          <Text style={[styles.tabText, activeTab === 'mechanic' && styles.activeTabText]}>Mechanic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'abilities' && styles.activeTab]}
          onPress={() => setActiveTab('abilities')}
        >
          <Text style={[styles.tabText, activeTab === 'abilities' && styles.activeTabText]}>Abilities</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'currency' && styles.activeTab]}
          onPress={() => setActiveTab('currency')}
        >
          <Text style={[styles.tabText, activeTab === 'currency' && styles.activeTabText]}>Currency</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'slot' && styles.activeTab]}
          onPress={() => setActiveTab('slot')}
        >
          <Text style={[styles.tabText, activeTab === 'slot' && styles.activeTabText]}>    Slot Machine</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderContent()}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home', { playerCurrency })}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  currency: {
    fontSize: 20,
    color: '#f1c40f',
    textAlign: 'center',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: '#f39c12',
  },
  tabText: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  section: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },
  cardName: {
    fontWeight: 'bold',
    color: '#f39c12',
  },
  backButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 14,
    alignSelf: 'center',
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  button:
  {
    alignSelf: 'center',
    height: 130,
  }
});