import {StyleSheet, View, FlatList} from 'react-native';
import Item from './ProductItem';
import {typography, spacing, radius} from '../../styles/index';

const ProductList = ({navigation, setVisible, setId, list}) => {
   return (
      <View style={styles.container}>
         <FlatList
            numColumns={3}
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
      paddingTop: spacing.s,
   },
});
export default ProductList;
