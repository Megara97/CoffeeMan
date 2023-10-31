import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   TextInput,
} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import More from '../../assets/icons/more.svg';
import Less from '../../assets/icons/less.svg';

const ItemDynamic = ({id, number, product, idProduct, subtotal, setChange}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);
   const size = 20;

   const [quantity, setQuantity] = useState(number);

   useEffect(() => {
      setQuantity(number);
   }, [number]);

   const calcTotal = () => {
      let total = 0;
      total = quantity * subtotal;
      total = total.toFixed(2);
      return total;
   };

   const onLess = async () => {
      try {
         const productsList = await AsyncStorage.getItem('products');
         const products = productsList ? JSON.parse(productsList) : [];

         const commandsList = await AsyncStorage.getItem('commands');
         const commands = commandsList ? JSON.parse(commandsList) : [];
         const index = commands.findIndex(element => element.id === id);
         if (index !== -1) {
            const indexProduct = commands[index].products.findIndex(
               element => element.id === idProduct,
            );
            if (indexProduct !== -1) {
               //Editar la cantidad del producto en la comanda
               if (quantity > 1) {
                  commands[index].products[indexProduct].quantity--;
                  //setQuantity(quantity - 1);
               } else if (quantity == 1) {
                  commands[index].products.splice(indexProduct, 1);
               }

               //Obtener informaciòn del producto editado para modificar el subtotal de la comanda
               const productInfo = products.find(
                  productInfo => productInfo.id === idProduct,
               );
               commands[index].subtotal -= productInfo.price;
            }
            const jsonValue = JSON.stringify(commands);
            await AsyncStorage.setItem('commands', jsonValue);
         }
         setQuantity(quantity - 1);
         setChange('less' + product + quantity);
      } catch (error) {
         console.error(error);
      }
   };

   const onMore = async () => {
      try {
         const productsList = await AsyncStorage.getItem('products');
         const products = productsList ? JSON.parse(productsList) : [];

         const commandsList = await AsyncStorage.getItem('commands');
         const commands = commandsList ? JSON.parse(commandsList) : [];
         const index = commands.findIndex(element => element.id === id);
         if (index !== -1) {
            const indexProduct = commands[index].products.findIndex(
               element => element.id === idProduct,
            );
            if (indexProduct !== -1) {
               //Editar la cantidad del producto en la comanda
               commands[index].products[indexProduct].quantity++;

               //Obtener informaciòn del producto editado para modificar el subtotal de la comanda
               const productInfo = products.find(
                  productInfo => productInfo.id === idProduct,
               );
               commands[index].subtotal += productInfo.price;
            }
            const jsonValue = JSON.stringify(commands);
            await AsyncStorage.setItem('commands', jsonValue);
         }
         setQuantity(quantity + 1);
         setChange('more' + product + quantity);
      } catch (error) {
         console.error(error);
      }
   };

   const onNumber = async value => {
      try {
         if (value === '') {
            value = quantity;
         }
         const productsList = await AsyncStorage.getItem('products');
         const products = productsList ? JSON.parse(productsList) : [];

         const commandsList = await AsyncStorage.getItem('commands');
         const commands = commandsList ? JSON.parse(commandsList) : [];
         const index = commands.findIndex(element => element.id === id);
         if (index !== -1) {
            const indexProduct = commands[index].products.findIndex(
               element => element.id === idProduct,
            );
            if (indexProduct !== -1) {
               //Editar la cantidad del producto en la comanda
               const before = commands[index].products[indexProduct].quantity;
               commands[index].products[indexProduct].quantity =
                  parseInt(value);

               //Obtener informaciòn del producto editado para modificar el subtotal de la comanda
               const productInfo = products.find(
                  productInfo => productInfo.id === idProduct,
               );
               commands[index].subtotal +=
                  (parseInt(value) - before) * productInfo.price;
            }
            const jsonValue = JSON.stringify(commands);
            await AsyncStorage.setItem('commands', jsonValue);
         }
         setQuantity(value);
         setChange('number' + product + quantity);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <View style={styles.item}>
         <View style={styles.quantity}>
            <TouchableOpacity style={styles.button} onPress={onLess}>
               <Less width={size} height={size} fill={colors.color1} />
            </TouchableOpacity>
            <TextInput
               style={styles.input}
               onEndEditing={e => onNumber(e.nativeEvent.text)}
               placeholder={quantity.toString()}
               keyboardType="numeric"
               placeholderTextColor={colors.typography}
            />
            <TouchableOpacity style={styles.button} onPress={onMore}>
               <More width={size} height={size} fill={colors.color1} />
            </TouchableOpacity>
         </View>
         <Text style={[styles.product]}>{product}</Text>
         <View style={styles.money}>
            <Text style={styles.textlight}>$ {subtotal.toFixed(2)}</Text>
            <Text style={[styles.text, {textAlign: 'right'}]}>
               $ {calcTotal()}
            </Text>
         </View>
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      item: {
         width: '97%',
         height: 60,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingHorizontal: spacing.s,
         borderBottomColor: colors.surface,
         borderBottomWidth: 1,
      },
      quantity: {
         width: '30%',
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      button: {
         height: 50,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
      },
      product: {
         width: '40%',
         textAlign: 'left',
         textAlignVertical: 'center',
         ...typography.title,
         color: colors.typography,
         paddingTop: spacing.s,
         lineHeight: spacing.l,
      },
      money: {
         width: '25%',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'flex-end',
      },
      input: {
         width: '40%',
         height: 50,
         backgroundColor: colors.background,
         marginHorizontal: spacing.xs,
         textAlign: 'center',
         ...typography.title,
         fontSize: 20,
         color: colors.typography,
         paddingVertical: 0,
      },
      text: {
         ...typography.body,
         color: colors.typography,
      },
      textlight: {
         ...typography.body,
         color: colors.overlay,
      },
   });
};

export default ItemDynamic;

/*
//No reacciona como se espera
   const [productInfo] = usePartLocalStorage('products', idProduct);
   const [command, deleteCommand, changeCommand] = usePartLocalStorage(
      'commands',
      id,
   );

   const onLess = async () => {
      try {
         if (command) {
            const indexProduct = command.products.findIndex(
               element => element.id === idProduct,
            );
            if (indexProduct !== -1) {
               let newValue = {...command};
               //Editar la cantidad del producto en la comanda
               if (quantity > 1) {
                  newValue.products[indexProduct].quantity--;
                  setQuantity(quantity - 1);
               } else if (quantity == 1) {
                  newValue.products.splice(indexProduct, 1);
               }

               //Modificar el subtotal d.productse la comanda con la informaciòn del producto editado
               newValue.subtotal -= productInfo.price;
               changeCommand(newValue);
            }
         }
         setChange('less' + product + quantity);
      } catch (error) {
         console.error(error);
      }
   };*/
