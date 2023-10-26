import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLocalStorage(key, initialValue) {
   const [storedValue, setStoredValue] = useState(initialValue);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const item = await AsyncStorage.getItem(key);
            setStoredValue(item ? JSON.parse(item) : initialValue);
         } catch (e) {
            setStoredValue(initialValue);
         }
      };
      fetchData();
   }, [key]);

   const setValue = async value => {
      try {
         await AsyncStorage.setItem(key, JSON.stringify(value));
         setStoredValue(value);
      } catch (e) {
         console.error(e);
      }
   };
   return [storedValue, setValue];
}
