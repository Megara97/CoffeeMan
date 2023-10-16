import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import ProductSectionSelectable from '../components/molecules/ProductSectionSelectable';
import CustomButton from '../components/atoms/CustomButton';
import colors from '../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Products = ({navigation, route}) => {
   const [selectedItems, setSelectedItems] = useState([]);
   const onSave = async () => {
      try {
         const currentValue = await AsyncStorage.getItem('commands');
         const currentProducts = await AsyncStorage.getItem('products');

         let newProducts = [];
         if (currentProducts) {
            let productList = JSON.parse(currentProducts);
            newProducts = productList.filter(product =>
               selectedItems.includes(product.id),
            ); //copia de productList pero solo con los productos seleccionados
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
                  ].products.findIndex(
                     product => product.product === newProduct.product,
                  ); //Verificaciòn de si el producto seleccionado ya esta en la comanda
                  if (existingProductIndex !== -1) {
                     //Si està se aumenta su cantidad en 1
                     commandList[index].products[existingProductIndex]
                        .quantity++;
                  } else {
                     //Si no està se agrega
                     commandList[index].products.push({
                        product: newProduct.product,
                        quantity: 1,
                     });
                  }
               }
               const totalSelectedPrice = newProducts.reduce(
                  (total, product) => total + product.price,
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
      /* navigation.navigate('CommandDetails', {
         id: route.params.id,
         change: 'Add' + selectedItems,
      });*/
      //navigation.push('CommandDetails', {id: route.params.id});
      navigation.navigate('CommandDetails', {id: route.params.id});
   };

   return (
      <View style={styles.container}>
         <View style={styles.commandList}>
            <ProductSectionSelectable
               navigation={navigation}
               onSelect={setSelectedItems}
               id={route.params.id}
            />
         </View>
         <View style={styles.new}>
            <TouchableOpacity onPress={onSave}>
               <CustomButton type={5} />
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.background,
      width: '100%',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   commandList: {
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   new: {
      width: '100%',
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default Products;
