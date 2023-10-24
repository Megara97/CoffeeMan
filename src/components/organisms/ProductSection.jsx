import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import Search from '../atoms/Search';
import ProductList from '../molecules/ProductList';
import {typography, spacing, radius} from '../../styles/index';

const ProductSection = ({navigation, setVisible, setId, products}) => {
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
         <ProductList
            navigation={navigation}
            setVisible={setVisible}
            setId={setId}
            list={list}
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
