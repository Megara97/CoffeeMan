import {
   StyleSheet,
   View,
   FlatList,
   Dimensions,
   DeviceEventEmitter,
} from 'react-native';
import {useEffect, useState} from 'react';
import Item from '../atoms/CommandProductItem';
import {typography, spacing, radius} from '../../styles/index';

const CommandProductList = ({navigation, list, onSelect}) => {
   const [windowWidth, setWindowWidth] = useState(
      Dimensions.get('window').width,
   );
   const [column, setColumn] = useState(3);

   useEffect(() => {
      const updateWindowWidth = () => {
         setWindowWidth(Dimensions.get('window').width);
      };
      // Suscribirse al evento de cambio de orientación
      const orientationChangeSubscription = DeviceEventEmitter.addListener(
         'didUpdateDimensions',
         updateWindowWidth,
      );
      return () => {
         // Desuscribirse del evento al desmontar el componente
         orientationChangeSubscription.remove();
      };
   }, []);

   useEffect(() => {
      let columnsNumber = (windowWidth - 60) / 110;
      columnsNumber = Math.floor(columnsNumber);
      setColumn(columnsNumber);
   }, [windowWidth]);

   /*const setColumns = () => {
      let columnsNumber = (windowWidth - 60) / 110;
      columnsNumber = Math.floor(columnsNumber);
      return columnsNumber;
   };*/

   const [selectedItems, setSelectedItems] = useState([]);

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
            key={column}
            numColumns={column} //3,setColumns()
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
   },
});

export default CommandProductList;
