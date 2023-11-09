import React, {useEffect, useState} from 'react';
import {
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
import {usePartLocalStorage} from '../../customHooks/usePartLocalStorage';
import {editPriceProduct} from '../../../api';

const InfoProduct = ({
   id,
   setChange,
   visible,
   setVisible,
   setDeleteVisible,
}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [price, setPrice] = useState('');
   const [name, setName] = useState('');
   const [product, deleteProduct, changeProduct] = usePartLocalStorage(
      'products',
      id,
   );

   useEffect(() => {
      if (product) {
         setPrice(product.price.toString());
         setName(product.product);
      }
   }, [product]);

   const recordProductChanges = async () => {
      money = parseFloat(price);
      if (isNaN(money)) {
         money = 0;
      }

      try {
         //SUBIR A BASE DE DATOS
         await editPriceProduct(id, money);

         if (product) {
            let newValue = {...product};
            newValue.price = money;
            //newValue.product = name;
            changeProduct(newValue);
         }
         setVisible(!visible);
         setChange('Edit' + name + price);
      } catch (error) {
         console.error('No hay conexion con el servidor');
      }
   };

   /*useEffect(() => {
      const fetchData = async () => {
         try {
            const storedList = await AsyncStorage.getItem('products');

            if (storedList) {
               let products = JSON.parse(storedList);
               const index = products.findIndex(element => element.id === id);
               if (index !== -1) {
                  setPrice(products[index].price.toFixed(2).toString());
                  setName(products[index].product);
               }
            }
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, [id]);

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
      setVisible(!visible);
      setChange('Edit' + name + price);
   };
*/

   return (
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
                  <Text style={styles.textName}> {name} </Text>
                  <View style={styles.price}>
                     <Text style={styles.textPrice}> Precio $ </Text>
                     <TextInput
                        style={styles.inputPrice}
                        onChangeText={setPrice}
                        value={price}
                        keyboardType="numeric"
                        maxLength={7}
                     />
                  </View>
               </View>
               <View style={styles.buttons}>
                  <TouchableOpacity onPress={recordProductChanges}>
                     <CustomButton type={3} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setDeleteVisible(true)}>
                     <CustomButton type={4} />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
   );
};
/*
<TextInput
style={[styles.inputName]}
onChangeText={setName}
value={name}
placeholder="Producto"
placeholderTextColor={colors.overlay}
/>
*/

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
         width: '40%',
         flexDirection: 'row',
         justifyContent: 'space-between',
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
      textName: {
         color: colors.typography,
         ...typography.titleBold,
         paddingBottom: spacing.xs,
      },
      textPrice: {
         color: colors.typography,
         ...typography.title,
      },
   });
};

export default InfoProduct;
