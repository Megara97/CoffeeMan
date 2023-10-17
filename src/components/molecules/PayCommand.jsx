import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors';
import CustomButton from '../atoms/CustomButton';
import {Shadow} from 'react-native-shadow-2';
import {useEffect, useState} from 'react';
import ButtonGroup from './ButtonGroup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShadowPresets = {
   general: {
      distance: 10,
      startColor: colors.typography + '30',
      endColor: colors.background,
      style: {
         borderTopStartRadius: 17,
         borderTopRightRadius: 17,
         flexDirection: 'row',
      },
   },
};

const PayCommand = ({navigation, id}) => {
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
      <Shadow {...ShadowPresets.general}>
         <View style={styles.menuContainer}>
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

const styles = StyleSheet.create({
   menuContainer: {
      width: '100%',
      height: 240,
      backgroundColor: colors.gray2,
      flexDirection: 'columns',
      justifyContent: 'flex-end',
      paddingBottom: 10,
      borderTopStartRadius: 17,
      borderTopRightRadius: 17,
      alignItems: 'center',
   },
   productsMenu: {
      width: '70%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   buttonsMenu: {
      width: '100%',
      height: 70,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
   },
   buttonsGroups: {
      width: '100%',
      flexDirection: 'colums',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
   },
   content: {
      fontSize: 13,
      fontFamily: 'Jaldi-Regular',
      color: colors.typography,
   },
   bold: {
      fontSize: 15,
      fontFamily: 'Jaldi-Bold',
      color: colors.typography,
   },
});

export default PayCommand;
