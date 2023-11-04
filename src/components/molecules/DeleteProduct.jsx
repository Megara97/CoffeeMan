import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../atoms/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import {usePartLocalStorage} from '../../customHooks/usePartLocalStorage';

const DeleteProduct = ({
   id,
   setChange,
   visible,
   setVisible,
   setInfoVisible,
}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [name, setName] = useState('');
   const [product, deleteProduct, changeProduct] = usePartLocalStorage(
      'products',
      id,
   );

   useEffect(() => {
      if (product) {
         setName(product.product);
      }
   }, [product]);

   const closeModals = () => {
      setVisible(!visible);
      setInfoVisible(!visible);
   };

   const recordDeletedProduct = () => {
      //SUBIR A BASE DE DATOS
      deleteProduct();
      closeModals();
      setChange('Delete' + name);
   };

   /*useEffect(() => {
      const fetchData = async () => {
         try {
            const storedList = await AsyncStorage.getItem('products');

            if (storedList) {
               let products = JSON.parse(storedList);
               const index = products.findIndex(element => element.id === id);
               if (index !== -1) {
                  //setPrice(products[index].price.toString());
                  setProduct(products[index].product);
               }
            }
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, [id]);

   const closeModals = () => {
      setVisible(!visible);
      setInfoVisible(!visible);
   };

   const onDelete = async () => {
      try {
         const currentValue = await AsyncStorage.getItem('products');
         if (currentValue) {
            let productList = JSON.parse(currentValue);
            const index = productList.findIndex(element => element.id === id);
            if (index !== -1) {
               productList.splice(index, 1);
               const jsonValue = JSON.stringify(productList);
               await AsyncStorage.setItem('products', jsonValue);
            }
         }
      } catch (e) {
         console.error(e);
      }
      closeModals();
      setChange('Delete' + name);
   };*/

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
               <Text style={styles.message}>
                  ¿Estas seguro de eliminar
                  <Text style={styles.bold}> {name}</Text>?
               </Text>
               <View style={styles.buttons}>
                  <TouchableOpacity onPress={closeModals}>
                     <CustomButton type={6} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={recordDeletedProduct}>
                     <CustomButton type={5} />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      backdrop: {
         width: '100%',
         height: '100%',
         backgroundColor: colors.typography + '70',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
      },
      container: {
         width: '80%',
         height: 170,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: colors.secondary,
         borderRadius: radius.s,
      },
      message: {
         textAlign: 'center',
         color: colors.typography,
         marginVertical: spacing.s,
         paddingHorizontal: spacing.l,
         ...typography.title,
      },
      bold: {
         ...typography.titleBold,
      },
      buttons: {
         width: '50%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginVertical: spacing.s,
      },
   });
};

export default DeleteProduct;
