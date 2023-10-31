import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLocalStorage(key, initialValue = [], change = 1) {
   const [storedValue, setStoredValue] = useState(initialValue);
   //console.log('cambio', change);
   //console.log('antes', key + storedValue);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const item = await AsyncStorage.getItem(key);
            setStoredValue(item ? JSON.parse(item) : initialValue);
            //onsole.log('despues', key + storedValue);
         } catch (e) {
            setStoredValue(initialValue);
         }
      };
      fetchData();
   }, [change]);

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
