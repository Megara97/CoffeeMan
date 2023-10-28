import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CustomButton from '../atoms/CustomButton/CustomButton';
import {Shadow} from 'react-native-shadow-2';
import {useEffect, useState} from 'react';
import ButtonGroup from '../molecules/ButtonGroup';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import {getLocalStorage} from '../../functions/getLocalStorage';
import {setLocalStorage} from '../../functions/setLocalStorage';
import {usePartLocalStorage} from '../../customHooks/usePartLocalStorage';
import CustomLittleButton from '../atoms/CustomLittleButton/CustomLittleButton';

const PayPaidCommand = ({navigation, list}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [numberCommands, setNumber] = useState(0);
   const [income, setIncome] = useState(0);
   const [tip, setTip] = useState(0);

   useEffect(() => {
      if (list) {
         setNumber(list.length);
         calcIncome = list.reduce(
            (total, command) => total + command.subtotal,
            0,
         );
         calcTip = list.reduce((total, command) => total + command.tip, 0);
         setIncome(calcIncome);
         setTip(calcTip);
      }
   }, [list]);

   const calcTotal = () => {
      let total = subtotal + tip;
      total = total.toFixed(2);
      return total;
   };

   return (
      <View style={styles.container}>
         <View style={styles.status}>
            <View style={styles.data}>
               <Text style={styles.title}> Ingresos </Text>
               <Text style={styles.title}> $ {income.toFixed(2)} </Text>
            </View>
            <View style={styles.data}>
               <Text style={styles.title}> Propinas </Text>
               <Text style={styles.title}> $ {tip.toFixed(2)} </Text>
            </View>
         </View>
         <View style={styles.data}>
            <Text style={styles.text}> Numero de Comandas: </Text>
            <Text style={styles.text}> {numberCommands} </Text>
         </View>
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '80%',
         height: 80,
         backgroundColor: colors.surface,
         flexDirection: 'column',
         justifyContent: 'space-evenly',
         alignItems: 'center',
         borderRadius: radius.s,
      },
      status: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      data: {
         width: '50%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      text: {
         ...typography.body,
         color: colors.typography,
      },
      title: {
         ...typography.title,
         color: colors.typography,
      },
   });
};

export default PayPaidCommand;
