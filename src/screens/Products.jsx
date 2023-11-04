import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import CommandProductSection from '../components/organisms/CommandProductSection';
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
         const productsList = await AsyncStorage.getItem('products');
         const products = productsList ? JSON.parse(productsList) : [];
         const commandsList = await AsyncStorage.getItem('commands');
         const commands = commandsList ? JSON.parse(commandsList) : [];
         const index = commands.findIndex(
            element => element.id === route.params.id,
         );
         //copia de products con la cantidad a agregar pero solo con los productos seleccionados
         let newProducts = [];
         newProducts = selectedItems
            .map(item1 => {
               const item2 = products.find(item2 => item2.id === item1.id);
               if (item2) {
                  return {...item2, quantity: item1.quantity};
               }
               return null;
            })
            .filter(item => item !== null);

         if (index !== -1) {
            for (const newProduct of newProducts) {
               const indexProduct = commands[index].products.findIndex(
                  element => element.id === newProduct.id,
               );
               if (indexProduct !== -1) {
                  //Si està el producto en la comanda editar su cantidad
                  commands[index].products[indexProduct].quantity +=
                     newProduct.quantity;
                  // Eliminar productos con cantidad igual a 0
                  commands[index].products = commands[index].products.filter(
                     item => item.quantity > 0,
                  );
               } else {
                  //Si no està el producto en la comanda se agrega
                  commands[index].products.push({
                     id: newProduct.id,
                     quantity: newProduct.quantity,
                  });
               }
            }
            //Obtener el precio total de los productos seleccionados
            const totalSelectedPrice = newProducts.reduce(
               (total, product) => total + product.price * product.quantity,
               0,
            );
            commands[index].subtotal += totalSelectedPrice; //sumarlo al subtotal de la comanda
            const jsonValue = JSON.stringify(commands);
            await AsyncStorage.setItem('commands', jsonValue);
         }
      } catch (e) {
         console.error(e);
      }
      navigation.navigate('CommandDetails', {
         id: route.params.id,
         change: selectedItems,
      });
   };

   /*
   const onSave = async () => {
      try {
         const currentValue = await AsyncStorage.getItem('commands');
         const currentProducts = await AsyncStorage.getItem('products');

         let newProducts = [];
         if (currentProducts) {
            let productList = JSON.parse(currentProducts);



            //newProducts = productList.filter(product =>
               ////selectedItems.includes(product.id),
               //selectedItems.some(item => item.id === product.id),);
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
                     // Eliminar productos con cantidad igual a 0
                     commandList[index].products = commandList[
                        index
                     ].products.filter(item => item.quantity > 0);
                  } else {
                     //Si no està se agrega
                     commandList[index].products.push({
                        id: newProduct.id,
                        //product: newProduct.product, //GESTIONAR MEJRO
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
      navigation.navigate('CommandDetails', {
         id: route.params.id,
         change: selectedItems,
      });
   };*/

   return (
      <View style={styles.container}>
         <View style={styles.list}>
            <CommandProductSection
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
         flex: 1,
         justifyContent: 'flex-start',
         alignItems: 'center',
         marginBottom: spacing.xs,
      },
      accept: {
         width: '100%',
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
         marginBottom: spacing.l,
         paddingHorizontal: spacing.l,
      },
   });
};

export default Products;
