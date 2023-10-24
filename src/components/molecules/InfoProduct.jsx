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
   const [product, setProduct] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         try {
            const storedList = await AsyncStorage.getItem('products');

            if (storedList) {
               let products = JSON.parse(storedList);
               const index = products.findIndex(element => element.id === id);
               if (index !== -1) {
                  setPrice(products[index].price.toFixed(2).toString());
                  setProduct(products[index].product);
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
      setChange('Edit' + product + price);
   };

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
                  <TouchableOpacity onPress={() => setDeleteVisible(true)}>
                     <CustomButton type={4} />
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
         width: '40%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingBottom: spacing.xl,
      },
      input: {
         width: '15%',
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
