import React, {useState} from 'react';
import {
   Modal,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native';
import CustomButton from '../atoms/CustomButton/CustomButton';
import colors from '../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';

const NewProduct = ({navigation, setChange, visible, setVisible}) => {
   const colors = useTheme().colors;
   const styles = StyleSheet.create({
      containerTotal: {
         backgroundColor: colors.typography + '70',
         width: '100%',
         flex: 1,
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
      },
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
         color: colors.typography,
      },
      textPrice: {
         color: colors.typography,
         fontFamily: 'Jaldi-Regular',
         fontSize: 13,
      },
   });

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
      setVisible(!visible);
      setChange('New' + product + price);
      setPrice('');
      setProduct('');

      //navigation.navigate('Menu', {change: 'New' + product + price});
   };

   return (
      <Modal
         animationType="slide"
         transparent={true}
         visible={visible}
         onRequestClose={() => {
            setVisible(!visible);
         }}>
         <View style={styles.containerTotal}>
            <View style={styles.container}>
               <View style={styles.info}>
                  <TextInput
                     style={[styles.input, {fontSize: 15, width: 250}]}
                     onChangeText={setProduct}
                     value={product}
                     placeholder="Producto"
                     placeholderTextColor={colors.mediumGray}
                  />
                  <View style={styles.price}>
                     <Text style={styles.textPrice}> Precio $ </Text>
                     <TextInput
                        style={[styles.input, {fontSize: 13, width: 60}]}
                        onChangeText={setPrice}
                        value={price}
                        keyboardType="numeric"
                        placeholder="0.00"
                        placeholderTextColor={colors.mediumGray}
                     />
                  </View>
               </View>
               <View style={styles.buttons}>
                  <TouchableOpacity onPress={onNew}>
                     <CustomButton type={3} />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
   );
};

export default NewProduct;
