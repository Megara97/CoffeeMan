import {StyleSheet, View, FlatList, useWindowDimensions} from 'react-native';
import Item from '../atoms/ProductItem';
import {typography, spacing, radius} from '../../styles/index';
import {useEffect, useState} from 'react';

const ProductList = ({navigation, list, setVisible, setId}) => {
   const {height, width} = useWindowDimensions();
   const [column, setColumn] = useState(3);

   useEffect(() => {
      let columnsNumber = (width - 60) / 110;
      columnsNumber = Math.floor(columnsNumber);
      setColumn(columnsNumber);
   }, [width]);

   return (
      <View style={styles.container}>
         <FlatList
            key={column}
            numColumns={column}
            data={list}
            renderItem={({item}) => (
               <Item
                  navigation={navigation}
                  id={item.id}
                  product={item.product}
                  price={item.price}
                  setId={setId}
                  setVisible={setVisible}
               />
            )}
            keyExtractor={item => item.id}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
export default ProductList;
