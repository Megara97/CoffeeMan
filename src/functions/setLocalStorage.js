import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setLocalStorage(key, newValue) {
   try {
      const jsonValue = JSON.stringify(newValue);
      await AsyncStorage.setItem(key, jsonValue);
   } catch (e) {
      console.error(e);
   }
}
