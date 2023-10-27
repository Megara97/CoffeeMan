import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export function usePartLocalStorage(key, id) {
   const [storedValue, setStoredValue] = useState([]);
   const [index, setIndex] = useState(-1);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const item = await AsyncStorage.getItem(key);
            const value = item ? JSON.parse(item) : [];
            const i = value.findIndex(element => element.id === id);
            setStoredValue(value);
            setIndex(i);
         } catch (e) {
            console.error(e);
         }
      };
      fetchData();
   }, [key, id]);

   const save = async newValue => {
      try {
         const jsonValue = JSON.stringify(newValue);
         await AsyncStorage.setItem(key, jsonValue);
         setStoredValue(newValue);
      } catch (e) {
         console.error(e);
      }
   };

   const onDelete = () => {
      if (index !== -1) {
         let newValue = storedValue.slice();
         newValue.splice(index, 1);
         save(newValue);
      }
   };

   const saveChanges = async newPart => {
      try {
         if (index !== -1) {
            let newValue = storedValue.slice();
            newValue[index] = newPart;
            save(newValue);
         }
      } catch (e) {
         console.error(e);
      }
   };
   //console.log(storedValue[index]);
   return [storedValue[index], onDelete, saveChanges];
}
