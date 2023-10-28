import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export function useCombineLocalStorage(id) {
   const [storedValue, setStoredValue] = useState([]);
   const [index, setIndex] = useState(-1);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const commandsList = await AsyncStorage.getItem('commands');
            const productsList = await AsyncStorage.getItem('products');
            const commands = commands ? JSON.parse(commandsList) : [];
            const products = products ? JSON.parse(productsList) : [];
            const i = value.findIndex(element => element.id === id);
            setIndex(i);
            if (i !== -1) {
               commands[i].products.forEach(productInOrder => {
                  const productInfo = products.find(
                     productInfo =>
                        productInfo.product === productInOrder.product,
                  );
                  if (productInfo) {
                     productInOrder.price = productInfo.price;
                  }
               });
               setStoredValue(commands[index].products);
            }
         } catch (e) {
            console.error(e);
         }
      };
      fetchData();
   }, [id]);

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
