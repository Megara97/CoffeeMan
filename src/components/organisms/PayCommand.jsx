import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CustomButton from '../atoms/CustomButton/CustomButton';
import {Shadow} from 'react-native-shadow-2';
import {useEffect, useState} from 'react';
import ButtonGroup from '../molecules/ButtonGroup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import {getLocalStorage} from '../../functions/getLocalStorage';
import {setLocalStorage} from '../../functions/setLocalStorage';

const PayCommand = ({navigation, id}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [numberProducts, setNumber] = useState(0);
   const [subtotal, setSubtotal] = useState(0);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const storedList = await AsyncStorage.getItem('commands');

            if (storedList) {
               let commands = JSON.parse(storedList);
               const index = commands.findIndex(element => element.id === id);
               if (index !== -1) {
                  setNumber(
                     commands[index].products.reduce(
                        (total, product) => total + product.quantity,
                        0,
                     ),
                  );
                  setSubtotal(commands[index].subtotal);
               }
            }
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, []);

   const onDelete = async () => {
      try {
         const currentValue = await AsyncStorage.getItem('commands');
         if (currentValue) {
            let commandList = JSON.parse(currentValue);
            const index = commandList.findIndex(element => element.id === id);
            if (index !== -1) {
               commandList.splice(index, 1);
               const jsonValue = JSON.stringify(commandList);
               await AsyncStorage.setItem('commands', jsonValue);
            }
         }
      } catch (e) {
         console.error(e);
      }
      //SUBIR A BASE DE DATOS
      navigation.navigate('Commands', {
         change: 'Pay' + id + numberProducts + subtotal,
      });
   };

   /*async function getLocalStorage(key, id) {
      let storedValue = [];
      let index = -1;
      try {
         const item = await AsyncStorage.getItem(key);
         storedValue = item ? JSON.parse(item) : [];
         index = storedValue.findIndex(element => element.id === id);
      } catch (e) {
         console.error(e);
      }
      console.log(storedValue, index);
      return index;
   }

   useEffect(() => {
      let commands = [];
      let index = -1;
      //[commands, index] = getLocalStorage('commands', id);
      console.log(getLocalStorage('commands', id));
      if (index !== -1) {
         setNumber(
            commands[index].products.reduce(
               (total, product) => total + product.quantity,
               0,
            ),
         );
         setSubtotal(commands[index].subtotal);
      }
   }, []);

   const onDelete = () => {
      const [commands, index] = getLocalStorage('commands', id);
      if (index !== -1) {
         commands.splice(index, 1);
         setLocalStorage('commands', commands);
      }
      //SUBIR A BASE DE DATOS
      navigation.navigate('Commands', {
         change: 'Pay' + id + numberProducts + subtotal,
      });
   };
*/

   const [tip, setTip] = useState(0);
   const [method, setMethod] = useState(0);
   const [tipC, setTipC] = useState('0');
   let propina = 0;
   let total = 0;

   const calcPropina = () => {
      switch (tip) {
         case 0:
            propina = 0;
            break;
         case 1:
            propina = subtotal * 0.05;
            break;
         case 2:
            propina = subtotal * 0.1;
            break;
         case 3:
            propina = subtotal * 0.15;
            break;
         case 4:
            propina = subtotal * 0.2;
            break;
         case 5:
            propina = tipC !== '' ? parseFloat(tipC) : 0;
            break;
         default:
            propina = 0;
            break;
      }
      propina = propina.toFixed(2);
      return propina;
   };

   const calcTotal = () => {
      total = subtotal + parseFloat(propina);
      total = total.toFixed(2);
      return total;
   };

   return (
      <Shadow {...styles.shadow}>
         <View style={styles.container}>
            <View style={styles.productsMenu}>
               <Text style={styles.content}>
                  {' '}
                  Productos ({numberProducts}){' '}
               </Text>
               <Text style={styles.content}> $ {subtotal.toFixed(2)} </Text>
            </View>
            <View style={styles.productsMenu}>
               <Text style={styles.content}> Propina </Text>
               <Text style={styles.content}> $ {calcPropina()} </Text>
            </View>
            <View style={styles.productsMenu}>
               <Text style={styles.bold}> Total </Text>
               <Text style={styles.bold}> $ {calcTotal()} </Text>
            </View>
            <View style={styles.buttonsGroups}>
               <ButtonGroup
                  title="Propina"
                  buttons={[
                     {type: 3, text: '0%'},
                     {type: 3, text: '5%'},
                     {type: 3, text: '10%'},
                     {type: 3, text: '15%'},
                     {type: 3, text: '20%'},
                     {
                        type: 4,
                        value: tipC,
                        setValue: newTip => setTipC(newTip),
                     },
                  ]}
                  selectedOption={tip}
                  onSelect={setTip}
               />
               <ButtonGroup
                  title="Método de pago"
                  buttons={[
                     {type: 1, text: ''},
                     {type: 2, text: ''},
                  ]}
                  selectedOption={method}
                  onSelect={setMethod}
               />
            </View>
            <View style={styles.buttonsMenu}>
               <TouchableOpacity onPress={onDelete}>
                  <CustomButton type={5} />
               </TouchableOpacity>
            </View>
         </View>
      </Shadow>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '100%',
         height: 260,
         backgroundColor: colors.secondary,
         flexDirection: 'columns',
         justifyContent: 'flex-end',
         alignItems: 'center',
         paddingBottom: spacing.m,
         borderTopStartRadius: radius.l,
         borderTopRightRadius: radius.l,
      },
      productsMenu: {
         width: '70%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      buttonsGroups: {
         width: '100%',
         flexDirection: 'colums',
         alignItems: 'center',
         justifyContent: 'center',
         paddingVertical: spacing.s,
      },
      buttonsMenu: {
         width: '100%',
         height: 70,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      content: {
         ...typography.body,
         color: colors.typography,
      },
      bold: {
         ...typography.titleBold,
         color: colors.typography,
      },
      shadow: {
         distance: spacing.s,
         ...colors.shadow,
         style: {
            flexDirection: 'row',
         },
      },
   });
};

export default PayCommand;
