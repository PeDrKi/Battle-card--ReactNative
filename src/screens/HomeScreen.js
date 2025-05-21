import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, ImageBackground, StyleSheet } from "react-native";
import { getPlayerCurrency } from "../utils/CurrencyManager";

const { width, height } = Dimensions.get("window");
const cardWidth = width / 2 - 30;
const cardHeight = cardWidth * 1.5;

export default function HomeScreen({ navigation }) {
  const [playerCurrency, setPlayerCurrency] = useState(100);

  useEffect(() => {
    const loadCurrency = async () => {
      const currency = await getPlayerCurrency();
      setPlayerCurrency(currency);
    };
    loadCurrency();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/Components/Home_background.png")}
      style={styles.container}
    >
      <Image source={require("../../assets/Components/NAME.png")} style={styles.title_name} />
      <TouchableOpacity onPress={() => navigation.navigate("Game", { playerCurrency })}>
        <Image
          source={require("../../assets/Components/btn_play.png")}
          style={styles.button}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AllCard", { playerCurrency })}>
        <Image
          source={require("../../assets/Components/btn_deck.png")}
          style={styles.button}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SlotMachine", { playerCurrency })}>
        <Image
          source={require("../../assets/Components/btn_slot.png")}
          style={styles.button}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("HowToPlay")}>
        <Image
          source={require("../../assets/Components/btn_htp.png")}
          style={styles.button}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AboutUsScreen")}>
        <Image
          source={require("../../assets/Components/btn_aboutus.png")}
          style={styles.button}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title_name: {
    marginTop: 70,
    marginBottom: 60,
    height: cardHeight * 0.5,
    width: cardWidth * 2,
    resizeMode: "contain",
  },
  title: {
    marginTop: 90,
    marginBottom: 10,
    height: cardHeight * 0.3,
    width: cardWidth * 2,
    resizeMode: "contain",
  },
  button: {
    height: cardHeight * 0.45,
    width: cardWidth * 2,
    resizeMode: "contain",
  },
});