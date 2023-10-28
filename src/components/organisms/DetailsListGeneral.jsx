import {StyleSheet, View, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import ItemDynamic from './DetailsItem';
import Item from '../molecules/DetailsItemSimple';
import {typography, spacing, radius} from '../../styles/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const DetailsList = ({navigation, id, list, setChange, dynamic = false}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [details, setDetails] = useState([]);

   useEffect(() => {
      if (!dynamic) {
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
                  const index = commands.findIndex(
                     element => element.id === id,
                  );
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
                     setDetails(commands[index].products);
                  }
               }
            } catch (error) {
               console.error(error);
            }
         };
         fetchData();
      } else {
         setDetails(list);
      }
   }, [list]);

   return (
      <View style={styles.container}>
         <View style={styles.listContainer}>
            <FlatList
               numColumns={1}
               data={details}
               keyExtractor={item => item.product}
               renderItem={({item}) =>
                  dynamic ? (
                     <ItemDynamic
                        navigation={navigation}
                        product={item.product}
                        number={item.quantity}
                        subtotal={item.price}
                        setChange={setChange}
                        id={id}
                     />
                  ) : (
                     <Item
                        navigation={navigation}
                        product={item.product}
                        number={item.quantity}
                        subtotal={item.price}
                     />
                  )
               }
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
         paddingVertical: spacing.xs,
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
