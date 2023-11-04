import {
   StyleSheet,
   View,
   FlatList,
   Dimensions,
   DeviceEventEmitter,
} from 'react-native';
import Item from '../atoms/ProductItem';
import {typography, spacing, radius} from '../../styles/index';
import {useEffect, useState} from 'react';

const ProductList = ({navigation, list, setVisible, setId}) => {
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
