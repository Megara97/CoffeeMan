import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import Search from '../atoms/Search';
import ProductListSelectable from '../molecules/ProductListQuantity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {typography, spacing, radius} from '../../styles/index';
import {useLocalStorage} from '../../customHooks/useLocalStorage';

const ProductSection = ({navigation, id, onSelect}) => {
   const [list, setList] = useState([]); //lista con cambios
   const [defaultList, setDefaultList] = useState([]); //lista original
   const [text, setText] = useState(''); //palabra para buscar
   /*const [products] = useLocalStorage('products');

   useEffect(() => {
      setList(products);
      setDefaultList(products);
   }, [products]);*/

   useEffect(() => {
      const fetchData = async () => {
         try {
            const currentValue = await AsyncStorage.getItem('commands');
            const currentProducts = await AsyncStorage.getItem('products');

            let products = [];
            if (currentProducts) {
               products = JSON.parse(currentProducts);
            }

            if (currentValue) {
               let commands = JSON.parse(currentValue);
               const index = commands.findIndex(element => element.id === id);
               if (index !== -1) {
                  products.forEach(productRegister => {
                     const productInfo = commands[index].products.find(
                        productInfo => productInfo.id === productRegister.id,
                     );
                     if (productInfo) {
                        productRegister.quantity = productInfo.quantity;
                     }
                  });
               }
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
         <ProductListSelectable
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

export default ProductSection;
