import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export function useCombineLocalStorage(id, change) {
   const [storedProducts, setStoredProducts] = useState([]);
   const [storedCommands, setStoredCommands] = useState([]);
   const [index, setIndex] = useState(-1);

   const fetchData = async () => {
      try {
         const productsList = await AsyncStorage.getItem('products');
         const products = productsList ? JSON.parse(productsList) : [];
         const commandsList = await AsyncStorage.getItem('commands');
         const commands = commandsList ? JSON.parse(commandsList) : [];
         const i = commands.findIndex(element => element.id === id);
         setStoredProducts(products);
         setStoredCommands(commands);
         setIndex(i);
      } catch (e) {
         console.error(e);
      }
   };

   useEffect(() => {
      fetchData();
   }, [id, change]);

   /*const save = async newValue => {
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
   };*/
   //console.log(storedValue[index]); onDelete, saveChanges
   return [storedCommands[index], storedProducts, fetchData];
}
