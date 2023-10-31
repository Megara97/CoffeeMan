import {StyleSheet, View, Text} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import {usePartLocalStorage} from '../../customHooks/usePartLocalStorage';
import CustomLittleButton from '../atoms/CustomLittleButton/CustomLittleButton';

const BottomPaidCommand = ({id}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [numberProducts, setNumber] = useState(0);
   const [subtotal, setSubtotal] = useState(0);
   const [tip, setTip] = useState(0);
   const [method, setMethod] = useState('');

   const [command] = usePartLocalStorage('commands', id);

   useEffect(() => {
      if (command) {
         setNumber(
            command.products.reduce(
               (number, product) => number + product.quantity,
               0,
            ),
         );
         setSubtotal(command.subtotal);
         setTip(command.tip);
         setMethod(command.method);
      }
   }, [command]);

   const calcTotal = () => {
      let total = subtotal + tip;
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
               <Text style={styles.content}> $ {tip.toFixed(2)} </Text>
            </View>
            <View style={styles.productsMenu}>
               <Text style={styles.bold}> Total </Text>
               <Text style={styles.bold}> $ {calcTotal()} </Text>
            </View>
            <View style={styles.methodMenu}>
               <Text style={styles.content}> Método de pago </Text>
               {method === 'efectivo' ? (
                  <CustomLittleButton type={1} active={true} />
               ) : (
                  <CustomLittleButton type={2} active={true} />
               )}
            </View>
         </View>
      </Shadow>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '100%',
         height: 150,
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
      methodMenu: {
         width: '40%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingBottom: spacing.s,
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

export default BottomPaidCommand;
