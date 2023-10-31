import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import Search from '../atoms/Search';
import CommandProductList from '../molecules/CommandProductList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {typography, spacing, radius} from '../../styles/index';

const CommandProductSection = ({navigation, id, onSelect}) => {
   const [list, setList] = useState([]); //lista con cambios
   const [defaultList, setDefaultList] = useState([]); //lista original
   const [text, setText] = useState(''); //palabra para buscar

   useEffect(() => {
      const fetchData = async () => {
         try {
            const productsList = await AsyncStorage.getItem('products');
            const products = productsList ? JSON.parse(productsList) : [];

            const commandsList = await AsyncStorage.getItem('commands');
            const commands = commandsList ? JSON.parse(commandsList) : [];
            const index = commands.findIndex(element => element.id === id);
            if (index !== -1) {
               //Agregar la cantidad de cada producto en la comanda a la lista de productos
               products.forEach(productInMenu => {
                  const productInfo = commands[index].products.find(
                     productInOrder => productInOrder.id === productInMenu.id,
                  );
                  if (productInfo) {
                     productInMenu.quantity = productInfo.quantity;
                  }
               });
            }
            const sortedData = [...products];
            sortedData.sort((a, b) => a.product.localeCompare(b.product));
            setList(sortedData);
            setDefaultList(sortedData);
            //setList(products);
            //setDefaultList(products);
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, []);

   /*useEffect(() => {
      const fetchData = async () => {
         try {
            const storedList = await AsyncStorage.getItem('products');
            if (storedList) {
               setList(JSON.parse(storedList));
               setDefaultList(JSON.parse(storedList));
            }
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, []);*/

   return (
      <View style={styles.container}>
         <Search
            _onChangeText={setText}
            textToSearch={text}
            data={defaultList}
            _setDataSort={setList}
         />
         <CommandProductList
            navigation={navigation}
            list={list}
            onSelect={onSelect}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: spacing.s,
   },
});

export default CommandProductSection;
