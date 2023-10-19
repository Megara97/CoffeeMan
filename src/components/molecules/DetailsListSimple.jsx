import {StyleSheet, View, Text, FlatList} from 'react-native';
import colors from '../../assets/colors';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';

const Item = ({navigation, number, product, subtotal}) => {
   const colors = useTheme().colors;
   const styles = StyleSheet.create({
      item: {
         width: '100%',
         height: 30,
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         paddingHorizontal: 10,
         borderBottomColor: colors.gray1,
         borderBottomWidth: 1,
      },
      quantity: {
         width: '20%', //80,
         height: 30,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      input: {
         width: 25,
         height: 20,
         backgroundColor: colors.background,
         paddingVertical: 0,
         fontFamily: 'Jaldi-Regular',
         textAlign: 'center',
         fontSize: 13,
      },
      text: {
         fontSize: 13,
         fontFamily: 'Jaldi-Regular',
         color: colors.typography,
      },
      textlight: {
         fontSize: 13,
         width: '20%', //70,
         fontFamily: 'Jaldi-Regular',
         color: colors.mediumGray,
         textAlign: 'right',
      },
   });

   let total = number * subtotal;
   return (
      <View style={styles.item}>
         <View style={styles.quantity}>
            <Text style={styles.text}> {number} </Text>
         </View>
         <Text style={[styles.text, {width: '40%'}]}> {product} </Text>
         <Text style={styles.textlight}> $ {subtotal.toFixed(2)} </Text>
         <Text style={[styles.text, {width: '20%', textAlign: 'right'}]}>
            $ {total.toFixed(2)}
         </Text>
      </View>
   );
};

const DetailsList = ({navigation, id}) => {
   const colors = useTheme().colors;
   const styles = StyleSheet.create({
      Container: {
         width: '100%',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         paddingVertical: 20,
      },
      listContainer: {
         width: '90%',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors.gray2,
         borderRadius: 17,
      },
   });

   const [list, setList] = useState([]);
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

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <View style={styles.Container}>
         <View style={styles.listContainer}>
            <FlatList
               numColumns={1}
               data={list}
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

export default DetailsList;
