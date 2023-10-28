import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
//import ProductSectionSelectable from '../components/organisms/ProductSectionGeneral';
import ProductSectionSelectable from '../components/organisms/ProductSectionQuantity';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../styles/index';

const Products = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [selectedItems, setSelectedItems] = useState([]);

   const onSave = async () => {
      try {
         const currentValue = await AsyncStorage.getItem('commands');
         const currentProducts = await AsyncStorage.getItem('products');

         let newProducts = [];
         if (currentProducts) {
            let productList = JSON.parse(currentProducts);
            /*newProducts = productList.filter(product =>
               //selectedItems.includes(product.id),
               selectedItems.some(item => item.id === product.id),);*/
            newProducts = selectedItems
               .map(item1 => {
                  const item2 = productList.find(
                     item2 => item2.id === item1.id,
                  );
                  if (item2) {
                     return {...item2, quantity: item1.quantity};
                  }
                  return null;
               })
               .filter(item => item !== null);
            //copia de productList pero solo con los productos seleccionados
         }

         if (currentValue) {
            let commandList = JSON.parse(currentValue);
            const index = commandList.findIndex(
               element => element.id === route.params.id,
            );
            if (index !== -1) {
               for (const newProduct of newProducts) {
                  const existingProductIndex = commandList[
                     index
                  ].products.findIndex(product => product.id === newProduct.id); //Verificaciòn de si el producto seleccionado ya esta en la comanda
                  if (existingProductIndex !== -1) {
                     //Si està se aumenta su cantidad en 1
                     commandList[index].products[
                        existingProductIndex
                     ].quantity += newProduct.quantity;
                  } else {
                     //Si no està se agrega
                     commandList[index].products.push({
                        id: newProduct.id,
                        product: newProduct.product, //GESTIONAR MEJRO
                        quantity: newProduct.quantity,
                     });
                  }
               }
               const totalSelectedPrice = newProducts.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0,
               ); //Obtener el precio total de los productos seleccionados
               commandList[index].subtotal += totalSelectedPrice; //sumarlo al subtotal de la comanda

               const jsonValue = JSON.stringify(commandList);
               await AsyncStorage.setItem('commands', jsonValue);
            }
         }
      } catch (e) {
         console.error(e);
      }
      navigation.navigate('CommandDetails', {id: route.params.id});
   };

   return (
      <View style={styles.container}>
         <View style={styles.list}>
            <ProductSectionSelectable
               navigation={navigation}
               onSelect={setSelectedItems}
               id={route.params.id}
               selectable
            />
         </View>
         <View style={styles.accept}>
            <TouchableOpacity onPress={onSave}>
               <CustomButton type={5} />
            </TouchableOpacity>
         </View>
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '100%',
         height: '100%',
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         backgroundColor: colors.background,
      },
      list: {
         width: '100%',
         height: '87%',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      accept: {
         width: '100%',
         height: '13%',
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
         paddingBottom: spacing.l,
      },
   });
};

export default Products;
