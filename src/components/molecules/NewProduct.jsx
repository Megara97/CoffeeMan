import React, {useState} from 'react';
import {
   Alert,
   Modal,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native';
import CustomButton from '../atoms/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import {saveProduct} from '../../../api';

const NewProduct = ({setChange, visible, setVisible, list, setList}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [price, setPrice] = useState('');
   const [name, setName] = useState('');

   const recordNewProduct = async () => {
      if (name != '') {
         money = parseFloat(price);
         if (isNaN(money)) {
            money = 0;
         }

         try {
            //SUBIR A BASE DE DATOS
            const newId = await saveProduct(name, money);
            if (newId === -1) {
               Alert.alert('', 'Ya existe un producto con este nombre', [
                  {text: 'OK'},
               ]);
            } else {
               /*let lastId = 1;
               if (list.length !== 0) {
                  lastId = list[list.length - 1].id + 1;
               }*/
               const newElement = {
                  id: newId, //lastId,
                  product: name,
                  price: money,
               };
               let newValue = list.slice();
               newValue.push(newElement);
               setList(newValue);
               setVisible(!visible);
               setPrice('');
               setName('');
            }
         } catch (error) {
            console.error('No hay conexion con el servidor');
         }
      } else {
         Alert.alert('', 'Establezca un nombre para el nuevo producto', [
            {text: 'OK'},
         ]);
      }
   };

   /*const newProduct = async () => {
      let lastId = 1;
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
         }/*

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
         );/*
      } catch (e) {
         console.error(e);
      }
      setVisible(!visible);
      setChange('New' + lastId + product + price);
      setPrice('');
      setProduct('');
   };
*/

   return (
      <>
         <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
               setVisible(!visible);
            }}>
            <View style={styles.backdrop}>
               <View style={styles.container}>
                  <View style={styles.info}>
                     <TextInput
                        style={[styles.inputName]}
                        onChangeText={setName}
                        value={name}
                        placeholder="Producto"
                        placeholderTextColor={colors.overlay}
                        maxLength={20}
                     />
                     <View style={styles.price}>
                        <Text style={styles.textPrice}> Precio $ </Text>
                        <TextInput
                           style={[styles.inputPrice]}
                           onChangeText={setPrice}
                           value={price}
                           keyboardType="numeric"
                           placeholder="0.00"
                           placeholderTextColor={colors.overlay}
                           maxLength={7}
                        />
                     </View>
                  </View>
                  <View style={styles.buttons}>
                     <TouchableOpacity
                        onPress={recordNewProduct}
                        //disabled={name === ''}
                     >
                        <CustomButton type={3} />
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>
      </>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      backdrop: {
         width: '100%',
         height: '100%',
         backgroundColor: colors.typography + '70',
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
      },
      container: {
         width: '100%',
         height: 170,
         //flex: 1,
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
         paddingTop: spacing.s,
         backgroundColor: colors.secondary,
         borderTopLeftRadius: radius.l,
         borderTopRightRadius: radius.l,
      },
      info: {
         width: '100%',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
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
         alignItems: 'center',
         marginBottom: spacing.l,
         marginTop: spacing.m,
      },
      inputName: {
         width: 200, // '50%',
         paddingHorizontal: spacing.xs,
         backgroundColor: colors.background,
         paddingVertical: 0,
         textAlign: 'center',
         ...typography.titleBold,
         color: colors.typography,
      },
      inputPrice: {
         width: 80, //'15%',
         paddingHorizontal: spacing.xs,
         backgroundColor: colors.background,
         paddingVertical: 0,
         textAlign: 'center',
         ...typography.title,
         color: colors.typography,
      },
      textPrice: {
         color: colors.typography,
         ...typography.title,
      },
   });
};

export default NewProduct;
