import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import Search from '../atoms/Search';
//import ProductList from '../molecules/ProductList';
import ProductList from '../molecules/ProductListGeneral';
//import ProductListSelectable from '../molecules/ProductListSelectable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {typography, spacing, radius} from '../../styles/index';
import {useLocalStorage} from '../../customHooks/useLocalStorage';
import {getLocalStorage} from '../../functions/getLocalStorage';

const ProductSection = ({
   navigation,
   onSelect,
   setVisible,
   setId,
   products,
   selectable = false,
}) => {
   const [list, setList] = useState([]); //lista con cambios
   const [defaultList, setDefaultList] = useState([]); //lista original
   const [text, setText] = useState(''); //palabra para buscar

   const [productsInm] = useLocalStorage('products');

   useEffect(() => {
      if (selectable) {
         setList(productsInm);
         setDefaultList(productsInm);
      } else {
         setList(products);
         setDefaultList(products);
      }
   }, [products, productsInm]);

   /*  
      useEffect(() => {
      if (selectable) {
         getLocalStorage('products').then(([products]) => {
            console.log(products);
            setList(products);
            setDefaultList(products);
         });
      } else {
         setList(products);
         setDefaultList(products);
      }
   }, [products]);

   useEffect(() => {
      if (selectable) {
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
      } else {
         setList(products);
         setDefaultList(products);
      }
   }, [products]);*/

   return (
      <View style={styles.container}>
         <Search
            _onChangeText={setText}
            textToSearch={text}
            data={defaultList}
            _setDataSort={setList}
         />
         {selectable ? (
            <ProductList
               navigation={navigation}
               list={list}
               onSelect={onSelect}
               selectable
            />
         ) : (
            <ProductList
               navigation={navigation}
               list={list}
               setVisible={setVisible}
               setId={setId}
            />
         )}
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
