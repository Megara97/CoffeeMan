import {StyleSheet, View, Text, FlatList} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import Item from './DetailsItemSimple.jsx';
import {typography, spacing, radius} from '../../styles/index';

const DetailsList = ({navigation, id}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [list, setList] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const currentValue = await AsyncStorage.getItem('commands');
            const currentProducts = await AsyncStorage.getItem('products');

            let productList = [];
            if (currentProducts) {
               productList = JSON.parse(currentProducts);
            }

            if (currentValue) {
               let commands = JSON.parse(currentValue);
               const index = commands.findIndex(element => element.id === id);
               if (index !== -1) {
                  commands[index].products.forEach(productInOrder => {
                     const productInfo = productList.find(
                        productInfo =>
                           productInfo.product === productInOrder.product,
                     );
                     if (productInfo) {
                        productInOrder.price = productInfo.price;
                     }
                  });
                  setList(commands[index].products);
               }
            }
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, []);

   return (
      <View style={styles.container}>
         <View style={styles.listContainer}>
            <FlatList
               numColumns={1}
               data={list}
               keyExtractor={item => item.product}
               renderItem={({item}) => (
                  <Item
                     navigation={navigation}
                     product={item.product}
                     number={item.quantity}
                     subtotal={item.price}
                  />
               )}
            />
         </View>
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '100%',
         flex: 1,
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'flex-start',
         paddingVertical: spacing.s,
      },
      listContainer: {
         width: '90%',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors.secondary,
         borderRadius: radius.s,
      },
   });
};

export default DetailsList;
