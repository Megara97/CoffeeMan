import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import Search from '../atoms/Search';
import ProductList from '../molecules/ProductList';
import ProductListSelectable from '../molecules/ProductListSelectable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {typography, spacing, radius} from '../../styles/index';

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
   }, [products]);

   return (
      <View style={styles.container}>
         <Search
            _onChangeText={setText}
            textToSearch={text}
            data={defaultList}
            _setDataSort={setList}
         />
         {selectable ? (
            <ProductListSelectable
               navigation={navigation}
               list={list}
               onSelect={onSelect}
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
