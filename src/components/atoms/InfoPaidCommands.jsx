import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import {Shadow} from 'react-native-shadow-2';
import Income from '../../assets/icons/up.svg';
import Expenses from '../../assets/icons/down.svg';
import Extra from '../../assets/icons/more.svg';
import Command from '../../assets/icons/command.svg';
import Menu from '../../assets/icons/menu.svg';
import {BarChart} from 'react-native-gifted-charts';

const PayPaidCommand = ({commands, costs}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);
   const size = 25;

   const [numberCommands, setNumber] = useState(0);
   const [income, setIncome] = useState(0);
   const [expenses, setExpenses] = useState(0);
   const [tip, setTip] = useState(0);
   const [products, setProducts] = useState(0);
   const [profits, setProfits] = useState(0);

   useEffect(() => {
      if (commands) {
         setNumber(commands.length);
         let calcIncome = commands.reduce(
            (total, command) => total + command.subtotal,
            0,
         );
         let calcTip = commands.reduce(
            (total, command) => total + command.tip,
            0,
         );
         let calcExpenses = costs.reduce(
            (total, cost) => total + cost.amount,
            0,
         );
         let calcProducts = commands.reduce((accumulator, currentObject) => {
            const productQuantities = currentObject.products
               .flat()
               .map(product => product.quantity);
            return (
               accumulator +
               productQuantities.reduce((sum, quantity) => sum + quantity, 0)
            );
         }, 0);
         setIncome(calcIncome);
         setTip(calcTip);
         setExpenses(calcExpenses);
         setProducts(calcProducts);
         setProfits(calcIncome - calcExpenses);
      }
   }, [commands, costs]);

   const barData = [
      {value: 250, label: 'Americano'},
      {value: 500, label: 'Galleta con chispas'},
      {value: 745, label: 'Flat White'},
      {value: 320, label: 'Latte'},
      {value: 600, label: 'Chocolate'},
      {value: 256, label: 'Caramel'},
      {value: 300, label: 'Capuchino'},
   ];

   return (
      <View style={styles.container}>
         <View style={styles.quantityContainer}>
            <View style={styles.data}>
               <View style={styles.status}>
                  <Command width={size} height={size} fill={colors.color1} />
                  <Text style={styles.title}>Comandas pagadas</Text>
               </View>
               <Text style={{...styles.title, color: colors.color1}}>
                  {'  '}
                  {numberCommands}
               </Text>
            </View>
            <View style={styles.data}>
               <View style={styles.status}>
                  <Menu width={size} height={size} fill={colors.color1} />
                  <Text style={styles.title}>Productos vendidos</Text>
               </View>
               <Text style={{...styles.title, color: colors.color1}}>
                  {'  '}
                  {products}
               </Text>
            </View>
         </View>
         <View style={styles.moneyContainer}>
            <View style={styles.balanceContainer}>
               <View style={styles.statusSimple}>
                  <View style={styles.status}>
                     <Income width={size} height={size} fill={colors.ok} />
                     <Text style={styles.titleBold}>Ingresos </Text>
                  </View>
                  <Text style={{...styles.titleBold, color: colors.ok}}>
                     {' '}
                     $ {income.toFixed(2)}{' '}
                  </Text>
               </View>
               <View style={styles.statusSimple}>
                  <View style={styles.status}>
                     <Expenses width={size} height={size} fill={colors.nok} />
                     <Text style={styles.titleBold}> Egresos </Text>
                  </View>
                  <Text style={{...styles.titleBold, color: colors.nok}}>
                     {' '}
                     $ {expenses.toFixed(2)}{' '}
                  </Text>
               </View>
            </View>
            <View style={styles.statusSimple}>
               <Text style={styles.titleBold}> Ganancias </Text>
               <Text
                  style={{
                     ...styles.titleBold,
                     color: profits > 0 ? colors.ok : colors.nok,
                  }}>
                  {' '}
                  $ {profits.toFixed(2)}{' '}
               </Text>
            </View>
            <View style={styles.statusSimple}>
               <View style={styles.status}>
                  <Extra width={size} height={size} fill={colors.neutral} />
                  <Text style={styles.title}> Propinas </Text>
               </View>
               <Text style={{...styles.title, color: colors.neutral}}>
                  {' '}
                  $ {tip.toFixed(2)}{' '}
               </Text>
            </View>
         </View>
         <View style={styles.chartContainer}>
            <BarChart
               noOfSections={5}
               barBorderTopLeftRadius={radius.xs}
               barBorderTopRightRadius={radius.xs}
               frontColor={colors.color1}
               data={barData}
               spacing={spacing.m}
               xAxisLabelTextStyle={{
                  ...styles.text,
                  transform: [{rotate: '-90deg'}],
                  //transform: [{rotate: '-70deg'}],
                  color: colors.typography,
                  lineHeight: spacing.m,
                  paddingTop: spacing.xxs,
                  textAlign: 'right',
               }}
               //rotateLabel={true}
               yAxisTextStyle={styles.text}
               xAxisColor={colors.typography}
               yAxisColor={colors.typography}
               xAxisLength={300}
               rulesLength={300}
               xAxisLabelsVerticalShift={30}
               labelWidth={55}
               xAxisTextNumberOfLines={2}
            />
         </View>
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '100%',
         flex: 1,
         //backgroundColor: colors.secondary,
         flexDirection: 'column',
         //justifyContent: 'flex-start',
         justifyContent: 'space-between',
         alignItems: 'center',
         borderRadius: radius.s,
         //paddingVertical: spacing.m,
         marginVertical: spacing.l,
         //borderBottomColor: colors.surface,
         //borderWidth: 1,
      },
      quantityContainer: {
         width: '100%',
         //height: '35%',
         //borderWidth: 1,
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         borderRadius: radius.s,
         //paddingVertical: spacing.m,
         // marginVertical: spacing.l,
      },
      moneyContainer: {
         width: '80%',
         //backgroundColor: colors.secondary,
         flexDirection: 'column',
         justifyContent: 'flex-start',
         alignItems: 'center',
         borderRadius: radius.s,
         // paddingVertical: spacing.m,
         marginVertical: spacing.m,
         //borderWidth: 1,
      },
      balanceContainer: {
         width: '100%',
         //flexDirection: 'column',
         //justifyContent: 'flex-start',
         alignItems: 'center',
         borderRadius: radius.s,
         borderBottomColor: colors.surface,
         borderBottomWidth: 1,
         //paddingVertical: spacing.m,
         //borderWidth: 1,
      },
      chartContainer: {
         width: '85%',
         //backgroundColor: colors.secondary,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: radius.s,
         paddingVertical: spacing.m,
         //marginVertical: spacing.l,
         //borderWidth: 1,
      },
      statusSimple: {
         width: '80%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingBottom: spacing.xxs,
         //borderWidth: 1,
      },
      status: {
         width: '50%',
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         paddingBottom: spacing.xxs,
         //borderWidth: 1,
      },
      data: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         paddingBottom: spacing.xs,
      },
      statusProducts: {
         width: '40%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         //paddingBottom: spacing.xxs,
      },
      text: {
         ...typography.body,
         color: colors.typography,
         lineHeight: spacing.l,
      },
      title: {
         ...typography.title,
         color: colors.typography,
         paddingLeft: spacing.s,
      },
      titleBold: {
         ...typography.titleBold,
         fontSize: 20,
         color: colors.typography,
         paddingLeft: spacing.s,
      },
      shadow: {
         distance: spacing.s,
         ...colors.shadow,
         style: {
            flexDirection: 'column',
         },
      },
   });
};

export default PayPaidCommand;
