import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import Search from '../atoms/Search';
import ProductList from '../molecules/ProductList';
import {typography, spacing, radius} from '../../styles/index';

const ProductSection = ({navigation, setVisible, setId, products}) => {
   const [list, setList] = useState(products); //lista con cambios
   const [defaultList, setDefaultList] = useState(products); //lista original
   const [text, setText] = useState(''); //palabra para buscar

   useEffect(() => {
      //setDefaultList(products);
      //setList(products);
      const sortedData = [...products];
      sortedData.sort((a, b) => a.product.localeCompare(b.product));
      setList(sortedData);
      setDefaultList(sortedData);
      setText('');
   }, [products]);

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
            list={list}
            setVisible={setVisible}
            setId={setId}
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
