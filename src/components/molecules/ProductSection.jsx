import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import Search from '../atoms/Search';
import ProductList from '../atoms/ProductList';

const ProductSection = ({navigation, products}) => {
   const [list, setList] = useState(products); //lista con cambios
   const [defaultList, setDefaultList] = useState([]); //lista original
   const [text, setText] = useState(''); //palabra para buscar

   useEffect(() => {
      setDefaultList(products);
      setList(products);
   }, [products]);

   //console.log('Productos:', products);
   return (
      <View style={styles.container}>
         <Search
            _onChangeText={setText}
            textToSearch={text}
            data={defaultList}
            _setDataSort={setList}
         />
         <ProductList navigation={navigation} list={list} />
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
