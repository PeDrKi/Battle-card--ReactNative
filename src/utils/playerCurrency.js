import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu tiền tệ
const saveCurrency = async (value) => {
  await AsyncStorage.setItem("playerCurrency", value.toString());
};

// Lấy tiền tệ
const loadCurrency = async () => {
  const value = await AsyncStorage.getItem("playerCurrency");
  return value ? parseInt(value) : 100;
};