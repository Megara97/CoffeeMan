import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   TextInput,
} from 'react-native';
import CustomButton from '../atoms/CustomButton/CustomButton';
import {Shadow} from 'react-native-shadow-2';
import {useEffect, useState} from 'react';
import ButtonGroup from '../molecules/ButtonGroup';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import {getLocalStorage} from '../../functions/getLocalStorage';
import {setLocalStorage} from '../../functions/setLocalStorage';
import {usePartLocalStorage} from '../../customHooks/usePartLocalStorage';

const PayCommand = ({navigation, id}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [numberProducts, setNumber] = useState(0);
   const [subtotal, setSubtotal] = useState(0);
   const [tipType, setTipType] = useState(0);
   const [method, setMethod] = useState(0);
   const [tipQuantity, setTipQuantity] = useState('0');
   const [money, setMoney] = useState('');

   const [command, deleteCommand, changeCommand] = usePartLocalStorage(
      'commands',
      id,
   );

   /*useEffect(() => {
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

   useEffect(() => {
      getLocalStorage('commands', id).then(([commands, index]) => {
         if (index !== -1) {
            setNumber(
               commands[index].products.reduce(
                  (number, product) => number + product.quantity,
                  0,
               ),
            );
            setSubtotal(commands[index].subtotal);
         }
      });
   }, []);

   const onDelete = () => {
      getLocalStorage('commands', id).then(([commands, index]) => {
         if (index !== -1) {
            commands.splice(index, 1);
            setLocalStorage('commands', commands);
         }
         //SUBIR A BASE DE DATOS
         navigation.navigate('Commands', {
            change: 'Pay' + id + numberProducts + subtotal,
         });
      });
   };
*/
   useEffect(() => {
      if (command) {
         setNumber(
            command.products.reduce(
               (number, product) => number + product.quantity,
               0,
            ),
         );
         setSubtotal(command.subtotal);
      }
   }, [command]);

   const recordCommandPaid = () => {
      //SUBIR A BASE DE DATOS
      //deleteCommand();
      if (command) {
         let newValue = {...command};
         newValue.status = 'paid';
         newValue.date = new Date();
         newValue.tip = calcTip();
         newValue.method = method === 0 ? 'efectivo' : 'tarjeta';
         changeCommand(newValue);
      }
      navigation.navigate('ActiveCommands', {
         change: 'Pay' + id + numberProducts + subtotal,
      });
      navigation.navigate('Commands', {
         change: 'Pay' + id + numberProducts + subtotal,
      });
   };

   const calcTip = () => {
      const percentage = {
         0: 0,
         1: 0.05,
         2: 0.1,
         3: 0.15,
         4: 0.2,
      };
      let tip = subtotal * percentage[tipType] || 0;
      if (tipType === 5) {
         tip = tipQuantity !== '' ? parseFloat(tipQuantity) : 0;
      }
      //tip = tip.toFixed(2);
      return tip;
   };

   const calcTotal = () => {
      const tip = calcTip();
      //let total = subtotal + parseFloat(tip);
      let total = subtotal + tip;
      return total;
   };

   const calcChange = () => {
      const total = calcTotal();
      let change = money - total;
      change = change.toFixed(2);
      if (money <= 0) {
         change = '       -';
      }
      return change;
   };

   const calcMoney = text => {
      let number = parseFloat(text);
      if (!isNaN(number)) {
         number = number.toFixed(2);
         setMoney(number);
      } else {
         setMoney('');
      }
   };

   return (
      <Shadow {...styles.shadow}>
         <View style={styles.container}>
            <View style={styles.productsMenu}>
               <Text style={styles.content}>Productos ({numberProducts})</Text>
               <Text style={styles.content}>$ {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.productsMenu}>
               <Text style={styles.content}>Propina</Text>
               <Text style={styles.content}>$ {calcTip().toFixed(2)}</Text>
            </View>
            <View style={styles.productsMenu}>
               <Text style={styles.bold}>Total</Text>
               <Text style={styles.bold}>$ {calcTotal().toFixed(2)}</Text>
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
                        value: tipQuantity,
                        setValue: tip => setTipQuantity(tip),
                     },
                  ]}
                  selectedOption={tipType}
                  onSelect={setTipType}
               />
               <ButtonGroup
                  title="Método de pago"
                  buttons={[{type: 1}, {type: 2}]}
                  selectedOption={method}
                  onSelect={setMethod}
               />
            </View>
            <View style={styles.buttonsMenu}>
               <View style={styles.changeMenu}>
                  <View style={styles.moneyMenu}>
                     <Text style={styles.content}>Recibido:</Text>
                     <View style={styles.inputContainer}>
                        <Text style={styles.content}>$ </Text>
                        <TextInput
                           style={styles.input}
                           onEndEditing={e => calcMoney(e.nativeEvent.text)}
                           onChangeText={setMoney}
                           value={money}
                           keyboardType="numeric"
                        />
                     </View>
                  </View>
                  <View style={styles.moneyMenu}>
                     <Text style={styles.content}>Cambio:</Text>
                     <Text style={styles.content}>$ {calcChange()} </Text>
                  </View>
               </View>
               <TouchableOpacity onPress={recordCommandPaid}>
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
         flex: 1,
         //height: 260,
         backgroundColor: colors.secondary,
         flexDirection: 'columns',
         justifyContent: 'flex-end',
         alignItems: 'center',
         paddingTop: spacing.s,
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
         marginVertical: spacing.s,
      },
      buttonsMenu: {
         width: '70%',
         marginTop: spacing.xxs,
         marginBottom: spacing.l,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      changeMenu: {
         width: '50%',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'flex-start',
      },
      moneyMenu: {
         width: 150, //'100%'
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      content: {
         ...typography.body,
         color: colors.typography,
      },
      inputContainer: {
         paddingLeft: spacing.xs,
         backgroundColor: colors.background,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      input: {
         paddingVertical: 0,
         textAlign: 'right',
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
