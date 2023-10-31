import {StyleSheet, View, FlatList} from 'react-native';
import {useState} from 'react';
import Item from './ProductItemQuantity';
import {typography, spacing, radius} from '../../styles/index';

const ProductListSelectable = ({navigation, list, onSelect}) => {
   const [selectedItems, setSelectedItems] = useState([]);

   /*const toggleItemSelection = id => {
      if (selectedItems.includes(id)) {
         setSelectedItems(selectedItems.filter(item => item !== id));
         onSelect(selectedItems.filter(item => item !== id));
      } else {
         setSelectedItems([...selectedItems, id]);
         onSelect([...selectedItems, id]);
      }
   };*/

   const substractItem = id => {
      let newValue = selectedItems.map(item => {
         if (item.id === id) {
            return {...item, quantity: item.quantity - 1};
         }
         return item;
      });
      if (!selectedItems.some(item => item.id === id)) {
         newValue.push({id: id, quantity: -1});
      }
      filterValue = newValue.filter(item => item.quantity != 0);
      console.log(filterValue);
      setSelectedItems(filterValue);
      onSelect(filterValue);
   };

   const addItem = id => {
      const newValue = selectedItems.map(item => {
         if (item.id === id) {
            return {...item, quantity: item.quantity + 1};
         }
         return item;
      });
      if (!selectedItems.some(item => item.id === id)) {
         newValue.push({id: id, quantity: 1});
      }
      setSelectedItems(newValue);
      onSelect(newValue);
   };

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
                  number={item.quantity}
                  addItem={addItem}
                  substractItem={substractItem}
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
      paddingVertical: spacing.s,
   },
});

export default ProductListSelectable;
