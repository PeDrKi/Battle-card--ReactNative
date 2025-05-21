import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENCY_KEY = 'playerCurrency';

// Lấy giá trị playerCurrency từ AsyncStorage
export const getPlayerCurrency = async () => {
  try {
    const value = await AsyncStorage.getItem(CURRENCY_KEY);
    return value !== null ? parseInt(value, 10) : 100; // Giá trị mặc định là 100
  } catch (error) {
    console.error('Error getting playerCurrency:', error);
    return 100;
  }
};

// Cập nhật giá trị playerCurrency
export const setPlayerCurrency = async (value) => {
  try {
    await AsyncStorage.setItem(CURRENCY_KEY, value.toString());
  } catch (error) {
    console.error('Error setting playerCurrency:', error);
  }
};

// Tăng hoặc giảm playerCurrency
export const updatePlayerCurrency = async (amount) => {
  try {
    const currentCurrency = await getPlayerCurrency();
    const newCurrency = Math.max(0, currentCurrency + amount); // Đảm bảo không âm
    await setPlayerCurrency(newCurrency);
    return newCurrency;
  } catch (error) {
    console.error('Error updating playerCurrency:', error);
    return currentCurrency;
  }
};