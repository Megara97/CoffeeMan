import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getLocalStorage(key, id) {
   let storedValue = [];
   let index = -1;
   try {
      const item = await AsyncStorage.getItem(key);
      storedValue = item ? JSON.parse(item) : [];
      index = storedValue.findIndex(element => element.id === id);
      //if (index !== -1) {
      //storedValue.splice(index, 1);
      //const jsonValue = JSON.stringify(storedValue);
      //await AsyncStorage.setItem(key, jsonValue);
      //}
   } catch (e) {
      console.error(e);
   }
   console.log(storedValue, index);
   return index;
}
