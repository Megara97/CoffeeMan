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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const NewProduct = ({
   navigation,
   setChange,
   visible,
   setVisible,
   list,
   setList,
}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [price, setPrice] = useState('');
   const [name, setName] = useState('');

   const recordNewProduct = () => {
      //SUBIR A BASE DE DATOS
      let lastId = 1;
      if (list.length !== 0) {
         lastId = list[list.length - 1].id + 1;
      }
      const newElement = {
         id: lastId,
         product: name,
         price: price === '' ? 0 : parseFloat(price),
      };
      let newValue = list.slice();
      newValue.push(newElement);
      setList(newValue);
      setVisible(!visible);
      setPrice('');
      setName('');
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
                     />
                  </View>
               </View>
               <View style={styles.buttons}>
                  <TouchableOpacity onPress={recordNewProduct}>
                     <CustomButton type={3} />
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
         justifyContent: 'flex-end',
         alignItems: 'center',
      },
      container: {
         width: '100%',
         height: 180,
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
         backgroundColor: colors.secondary,
         borderTopLeftRadius: radius.l,
         borderTopRightRadius: radius.l,
      },
      info: {
         width: '100%',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         paddingBottom: spacing.m,
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
         paddingBottom: spacing.xl,
      },
      inputName: {
         width: '70%',
         paddingHorizontal: spacing.xs,
         backgroundColor: colors.background,
         paddingVertical: 0,
         textAlign: 'center',
         ...typography.titleBold,
         color: colors.typography,
      },
      inputPrice: {
         width: '15%',
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
