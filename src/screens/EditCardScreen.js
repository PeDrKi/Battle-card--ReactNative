import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image } from "react-native";
import {APIURL} from "../utils/config"
import { getImageSource } from "../utils/get_image";

const { width, height } = Dimensions.get("window");
const cardWidth = width * 0.8;
const cardHeight = cardWidth * 1.75;

  const API_URL = APIURL;

export default function EditCardScreen({ route, navigation }) {
  const { card } = route.params;
  const [name, setName] = useState(card.name);
  const [attack, setAttack] = useState(card.attack.toString());
  const [defense, setDefense] = useState(card.defense.toString());

  // Khi thay đổi tên, kiểm tra nếu là "UNLOCK" thì xóa attack & defense
  useEffect(() => {
    if (name === "UNLOCK") {
      setAttack("");
      setDefense("");
      setName("");
    }
  }, [name]);

  // 🛠 Cập nhật thẻ bài
  const handleUpdateCard = async () => {
    if (!name || (!attack && name !== "UNLOCK") || (!defense && name !== "UNLOCK")) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${card.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          attack: name === "UNLOCK" ? null : parseInt(attack),
          defense: name === "UNLOCK" ? null : parseInt(defense),
        }),
      });

      if (response.ok) {
        Alert.alert("Thành công", "Thẻ bài đã được cập nhật!", [
          { text: "OK", onPress: () => navigation.goBack() }, // Quay lại và làm mới danh sách
        ]);
      } else {
        Alert.alert("Lỗi", "Không thể cập nhật thẻ bài!");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Lỗi kết nối API!");
    }
  };

  // 🗑️ Xóa thẻ bài
  const handleDeleteCard = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa thẻ bài này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              await fetch(`${API_URL}/${card.id}`, { method: "DELETE" });
              Alert.alert("Thành công", "Thẻ bài đã được xóa!");
              navigation.navigate("AllCard", { refresh: true });
            } catch (error) {
              Alert.alert("Lỗi", "Không thể xóa thẻ bài!");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Chỉnh Sửa Thẻ Bài</Text>

      <View style={styles.card}>
        <View style={styles.charaTitle}>
          <TextInput
              style={styles.charaTitleText} 
              placeholder="Tên thẻ bài" 
              onChangeText={setName}
              value={name}
              editable={name !== "UNLOCK"}
            />
        </View>
        <View style={styles.chara}>
          <Image source={getImageSource(name)} style={styles.charepic} />
        </View>
        <View style={styles.statusInfo}>
          <View style={styles.atkInfo}>
            <TextInput
              style={styles.statusText}
              placeholder="Tấn công"
              keyboardType="numeric"
              onChangeText={setAttack}
              value={attack}
              editable={name !== "UNLOCK"}
            />
          </View>
          <View style={styles.defInfo}>
            <TextInput
              style={styles.statusText}
              placeholder="Phòng thủ"
              keyboardType="numeric"
              onChangeText={setDefense}
              value={defense}
              editable={name !== "UNLOCK"}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateCard}>
        <Text style={styles.buttonText}>✅ Cập Nhật</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteCard}>
        <Text style={styles.buttonText}>🗑️ Xóa Thẻ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>❌ Hủy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a1a", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  updateButton: { backgroundColor: "#28a745", padding: 12, borderRadius: 8, marginTop: 10 },
  deleteButton: { backgroundColor: "#ff4757", padding: 12, borderRadius: 8, marginTop: 10 },
  backButton: { backgroundColor: "#666", padding: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  card: {
    backgroundColor: "#ccc",
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    width: cardWidth,
    height: cardHeight,
  },
  charaTitle: {
    backgroundColor: "#fff",
    height: cardHeight * 0.1,
    width: cardWidth * 0.9,
    marginBottom: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  charaTitleText: { fontWeight: "900", fontSize: 15 },
  chara: {
    backgroundColor: "#fff",
    height: cardHeight * 0.6,
    width: cardWidth * 0.9,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  charepic: { width: cardWidth * 0.8, height: cardHeight * 0.45 },
  statusInfo: { flexDirection: "row", alignItems: "center", marginTop: cardHeight * 0.04 },
  atkInfo: 
  { 
    backgroundColor: "crimson", 
    height: cardHeight * 0.15, 
    width: cardWidth * 0.36, 
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  defInfo: 
  { 
    backgroundColor: "#0070c7", 
    height: cardHeight * 0.15, 
    width: cardWidth * 0.36, 
    borderRadius: 8 ,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: { fontSize: 20, color: "white" },
});
