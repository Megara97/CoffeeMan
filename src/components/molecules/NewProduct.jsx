import React, {useState} from 'react';
import {
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native';
import CustomButton from '../atoms/CustomButton';
import colors from '../../assets/colors';
import {Shadow} from 'react-native-shadow-2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShadowPresets = {
   general: {
      distance: 10,
      startColor: colors.typography + '30',
      endColor: colors.background,
      style: {
         borderTopStartRadius: 17,
         borderTopRightRadius: 17,
         flexDirection: 'row',
      },
   },
};

const NewProduct = ({navigation}) => {
   const [price, setPrice] = useState('');
   const [product, setProduct] = useState('');

   const onNew = async () => {
      try {
         let productList = [];
         const currentValue = await AsyncStorage.getItem('products');
         if (currentValue) {
            productList = JSON.parse(currentValue);
         }
         /*const Id = await AsyncStorage.getItem('numberProducts');
         let lastId = JSON.parse(Id) + 1;
         if (!lastId) {
            lastId = 1;
         }*/

         let lastId = 1;
         if (productList.length !== 0) {
            lastId = productList[productList.length - 1].id + 1;
         }

         const newElement = {
            id: lastId,
            product: product,
            price: price === '' ? 0 : parseFloat(price),
         };

         productList.push(newElement);
         await AsyncStorage.setItem('products', JSON.stringify(productList));
         /*await AsyncStorage.setItem(
            'numberProducts',
            JSON.stringify(lastId),
         );*/
      } catch (e) {
         console.error(e);
      }
      navigation.navigate('Menu', {change: 'New' + product + price});
   };

   return (
      <Shadow {...ShadowPresets.general}>
         <View style={styles.container}>
            <View style={styles.info}>
               <TextInput
                  style={[styles.input, {fontSize: 15, width: 250}]}
                  onChangeText={setProduct}
                  value={product}
                  placeholder="Producto"
               />
               <View style={styles.price}>
                  <Text style={styles.textPrice}> Precio $ </Text>
                  <TextInput
                     style={[styles.input, {fontSize: 13, width: 60}]}
                     onChangeText={setPrice}
                     value={price}
                     keyboardType="numeric"
                  />
               </View>
            </View>
            <View style={styles.buttons}>
               <TouchableOpacity onPress={onNew}>
                  <CustomButton type={3} />
               </TouchableOpacity>
            </View>
         </View>
      </Shadow>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%', //80
      height: 180,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: colors.gray2,
      borderTopLeftRadius: 17,
      borderTopRightRadius: 17,
   },
   info: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 15,
   },
   price: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttons: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 100,
      alignItems: 'center',
      paddingBottom: 25,
   },
   input: {
      paddingHorizontal: 10,
      backgroundColor: colors.background,
      paddingVertical: 0,
      fontFamily: 'Jaldi-Regular',
      textAlign: 'center',
   },
   textPrice: {
      color: colors.typography,
      fontFamily: 'Jaldi-Regular',
      fontSize: 13,
   },
});

export default NewProduct;
