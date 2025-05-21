import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

// Import ảnh nền
const winBackground = require("../../assets/Components/Modal/Thang.png");
const loseBackground = require("../../assets/Components/Modal/Thua.png");

const GameResultModal = ({ visible, gameResult, onRestart, onHome }) => {
  const backgroundImage = gameResult === "win" ? winBackground : loseBackground;

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <ImageBackground
          source={backgroundImage}
          style={styles.modalContent}
          imageStyle={styles.backgroundImage}
        >
          <Text style={styles.resultText}>
            {gameResult === "win" ? "YOU WIN" : "YOU LOSE"}
          </Text>

          <TouchableOpacity style={styles.playAgainButton} onPress={onRestart}>
            <Text style={styles.playAgainText}>RESET</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={onHome}>
            <Text style={styles.homeButtonText}>HOME</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 320,
    height: 220,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  backgroundImage: {
    resizeMode: "cover",
    borderRadius: 10,
  },
  resultText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  playAgainButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  playAgainText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: "#FF5733",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  homeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GameResultModal;
