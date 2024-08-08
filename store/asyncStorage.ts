import { StateStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.error("Failed to set item in AsyncStorage:", error);
    }
  },
  getItem: async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value !== null ? value : null;
    } catch (error) {
      console.error("Failed to get item from AsyncStorage:", error);
      return null;
    }
  },
  removeItem: async (name) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.error("Failed to remove item from AsyncStorage:", error);
    }
  },
};
