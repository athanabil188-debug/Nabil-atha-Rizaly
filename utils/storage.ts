import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Fungsi untuk menyimpan data ke AsyncStorage
 * @param key Kunci untuk menyimpan data
 * @param value Nilai yang akan disimpan
 */
export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
    throw error;
  }
};

/**
 * Fungsi untuk mengambil data dari AsyncStorage
 * @param key Kunci untuk mengambil data
 * @returns Data yang telah diambil atau null jika tidak ditemukan
 */
export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    throw error;
  }
};

/**
 * Fungsi untuk menghapus data dari AsyncStorage
 * @param key Kunci untuk menghapus data
 */
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    throw error;
  }
};

/**
 * Fungsi untuk menghapus semua data dari AsyncStorage
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};