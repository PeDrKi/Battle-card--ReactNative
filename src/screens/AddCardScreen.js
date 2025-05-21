import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const API_URL = "http://192.168.128.149:8000/cards";

export default function AddCardScreen({ navigation }) {
  const [name, setName] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");

  // 🛠 Hàm gửi thẻ bài lên API
  const addNewCard = async () => {
    if (!name.trim()) {
      Alert.alert("Lỗi", "Tên thẻ không được để trống!");
      return;
    }

    const attackValue = parseInt(attack);
    const defenseValue = parseInt(defense);

    if (isNaN(attackValue) || isNaN(defenseValue)) {
      Alert.alert("Lỗi", "Giá trị tấn công và phòng thủ phải là số!");
      return;
    }

    if (attackValue < 0 || attackValue > 10 || defenseValue < 0 || defenseValue > 10) {
      Alert.alert("Lỗi", "Giá trị tấn công và phòng thủ phải từ 0 đến 10!");
      return;
    }

    const newCard = { name: name.trim(), attack: attackValue, defense: defenseValue };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        Alert.alert("Thành công", "Thẻ bài đã được thêm!", [
          { text: "OK", onPress: () => navigation.goBack() }, // 🔄 Quay lại và cập nhật danh sách
        ]);
      } else {
        Alert.alert("Lỗi", "Không thể thêm thẻ bài!");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể kết nối với máy chủ!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Thẻ Bài Mới</Text>
      <TextInput style={styles.input} placeholder="Tên thẻ" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Tấn công" value={attack} onChangeText={setAttack} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Phòng thủ" value={defense} onChangeText={setDefense} keyboardType="numeric" />
      <Button title="Thêm Thẻ" onPress={addNewCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a1a", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  input: { backgroundColor: "#fff", width: 200, padding: 10, marginVertical: 5, borderRadius: 5 },
});
