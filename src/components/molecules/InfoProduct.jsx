import React, {useEffect, useState} from 'react';
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

const InfoProduct = ({navigation, id, _onChangeProducts}) => {
   const [price, setPrice] = useState('');
   const [product, setProduct] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         try {
            const storedList = await AsyncStorage.getItem('products');

            if (storedList) {
               let products = JSON.parse(storedList);
               const index = products.findIndex(element => element.id === id);
               if (index !== -1) {
                  setPrice(products[index].price.toString());
                  setProduct(products[index].product);
               }
            }
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, []);

   const onSave = async () => {
      try {
         const currentValue = await AsyncStorage.getItem('products');
         if (currentValue) {
            let productList = JSON.parse(currentValue);
            const index = productList.findIndex(element => element.id === id);
            if (index !== -1) {
               productList[index].price = parseFloat(price);
               //productList[index].product = product;
               const jsonValue = JSON.stringify(productList);
               await AsyncStorage.setItem('products', jsonValue);
            }
         }
      } catch (e) {
         console.error(e);
      }
      navigation.navigate('Menu', {change: 'Edit' + product + price});
      //navigation.push('Menu');
   };

   return (
      <Shadow {...ShadowPresets.general}>
         <View style={styles.container}>
            <View style={styles.info}>
               <Text style={styles.textName}> {product} </Text>
               <View style={styles.price}>
                  <Text style={styles.textPrice}> Precio $ </Text>
                  <TextInput
                     style={styles.input}
                     onChangeText={setPrice}
                     value={price}
                     keyboardType="numeric"
                  />
               </View>
            </View>
            <View style={styles.buttons}>
               <TouchableOpacity onPress={onSave}>
                  <CustomButton type={3} />
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => navigation.navigate('Delete', {id: id})}>
                  <CustomButton type={4} />
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
      width: '100%', //80
      //height: 150,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 15,
   },
   price: {
      width: '100%', //80
      //height: 150,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttons: {
      width: '100%',
      //height: 150,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingHorizontal: 100,
      alignItems: 'center',
      paddingBottom: 25,
   },
   input: {
      //flex:1,
      width: 60,
      paddingHorizontal: 10,
      backgroundColor: colors.background,
      paddingVertical: 0,
      //height:'100%',
      fontFamily: 'Jaldi-Regular',
      fontSize: 13,
      textAlign: 'center',
   },
   textName: {
      color: colors.typography,
      fontFamily: 'Jaldi-Bold',
      fontSize: 15,
      paddingBottom: 5,
   },
   textPrice: {
      color: colors.typography,
      fontFamily: 'Jaldi-Regular',
      fontSize: 13,
   },
});

export default InfoProduct;
