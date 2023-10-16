import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   FlatList,
   TextInput,
} from 'react-native';
import colors from '../../assets/colors';
import {useEffect, useState} from 'react';
import CustomMiniButton from '../atoms/CustomMiniButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({navigation, id, number, product, subtotal, setChange}) => {
   const [quantity, setQuantity] = useState(number);
   let total = quantity * subtotal;

   const onLess = async () => {
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
               const indexProduct = commands[index].products.findIndex(
                  element => element.product === product,
               );
               if (indexProduct !== -1) {
                  if (quantity > 1) {
                     commands[index].products[indexProduct].quantity--;
                     setQuantity(quantity - 1);
                  } else if (quantity == 1) {
                     commands[index].products.splice(indexProduct, 1);
                  }
                  const productInfo = productList.find(
                     productInfo => productInfo.product === product,
                  );
                  commands[index].subtotal -= productInfo.price;
                  console.log(commands[index]);
               }
               const jsonValue = JSON.stringify(commands);
               await AsyncStorage.setItem('commands', jsonValue);
            }
            setChange('less' + product + quantity);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const onMore = async () => {
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
               const indexProduct = commands[index].products.findIndex(
                  element => element.product === product,
               );
               if (indexProduct !== -1) {
                  commands[index].products[indexProduct].quantity++;
                  const productInfo = productList.find(
                     productInfo => productInfo.product === product,
                  );
                  commands[index].subtotal += productInfo.price;
                  console.log(commands[index]);
               }
               const jsonValue = JSON.stringify(commands);
               await AsyncStorage.setItem('commands', jsonValue);
            }
         }
         setQuantity(quantity + 1);
         setChange('more' + product + quantity);
      } catch (error) {
         console.error(error);
      }
   };

   const onNumber = async value => {
      try {
         console.log(value);
         if (value === '') {
            value = quantity;
         }
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
               const indexProduct = commands[index].products.findIndex(
                  element => element.product === product,
               );
               if (indexProduct !== -1) {
                  const before =
                     commands[index].products[indexProduct].quantity;
                  commands[index].products[indexProduct].quantity =
                     parseInt(value);
                  const productInfo = productList.find(
                     productInfo => productInfo.product === product,
                  );
                  commands[index].subtotal +=
                     (parseInt(value) - before) * productInfo.price;
                  console.log(commands[index]);
               }
               const jsonValue = JSON.stringify(commands);
               await AsyncStorage.setItem('commands', jsonValue);
            }
         }
         setQuantity(value);
         setChange('number' + product + quantity);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <View style={styles.item}>
         <View style={styles.quantity}>
            <TouchableOpacity onPress={onLess}>
               <CustomMiniButton type={1} />
            </TouchableOpacity>
            <TextInput
               style={styles.input}
               onEndEditing={e => onNumber(e.nativeEvent.text)}
               placeholder={quantity.toString()}
               keyboardType="numeric"
            />
            <TouchableOpacity onPress={onMore}>
               <CustomMiniButton type={2} />
            </TouchableOpacity>
         </View>
         <Text style={[styles.text, {width: '40%'}]}> {product} </Text>
         <Text style={styles.textlight}> $ {subtotal.toFixed(2)} </Text>
         <Text style={[styles.text, {width: '20%', textAlign: 'right'}]}>
            {' '}
            $ {total.toFixed(2)}{' '}
         </Text>
      </View>
   );
};

const DetailsList = ({navigation, id, change, setChange, list}) => {
   //const [list, setList] = useState([]);
   //const [change, setChange] = useState('');
   /*const fetchData = async () => {
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
   }, [change]);
   
    */

   console.log('Productos', list);

   return (
      <View style={styles.Container}>
         <View style={styles.listContainer}>
            <FlatList
               numColumns={1}
               data={list}
               keyExtractor={item => item.product}
               renderItem={({item}) => (
                  <Item
                     navigation={navigation}
                     id={id}
                     product={item.product}
                     number={item.quantity}
                     subtotal={item.price}
                     setChange={setChange}
                  />
               )}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   Container: {
      width: '100%',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
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
      justifyContent: 'flex-start',
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

export default DetailsList;
