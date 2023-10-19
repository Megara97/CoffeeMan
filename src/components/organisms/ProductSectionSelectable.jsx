import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import Search from '../atoms/Search';
import ProductListSelectable from '../molecules/ProductListSelectable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductSection = ({navigation, onSelect, id}) => {
   const [list, setList] = useState([]); //lista con cambios
   const [defaultList, setDefaultList] = useState([]); //lista original
   const [text, setText] = useState(''); //palabra para buscar

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

   useEffect(() => {
      fetchData();
   }, []);

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
      //height: 500,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 10,
   },
});

export default ProductSection;
