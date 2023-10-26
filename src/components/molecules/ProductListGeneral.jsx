import {StyleSheet, View, FlatList} from 'react-native';
import {useState} from 'react';
import Item from './ProductItemGeneral';
//import ItemSelectable from './ProductItemSelectable';
//import Item from './ProductItem';
import {typography, spacing, radius} from '../../styles/index';

const ProductListSelectable = ({
   navigation,
   list,
   onSelect,
   setVisible,
   setId,
   selectable = false,
}) => {
   const [selectedItems, setSelectedItems] = useState([]);
   const toggleItemSelection = id => {
      if (selectedItems.includes(id)) {
         setSelectedItems(selectedItems.filter(item => item !== id));
         onSelect(selectedItems.filter(item => item !== id));
      } else {
         setSelectedItems([...selectedItems, id]);
         onSelect([...selectedItems, id]);
      }
   };

   return (
      <View style={styles.container}>
         <FlatList
            numColumns={3}
            data={list}
            renderItem={({item}) =>
               selectable ? (
                  <Item
                     navigation={navigation}
                     id={item.id}
                     product={item.product}
                     price={item.price}
                     isSelected={selectedItems.includes(item.id)}
                     toggleSelection={toggleItemSelection}
                     selectable
                  />
               ) : (
                  <Item
                     navigation={navigation}
                     id={item.id}
                     product={item.product}
                     price={item.price}
                     setId={setId}
                     setVisible={setVisible}
                  />
               )
            }
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
