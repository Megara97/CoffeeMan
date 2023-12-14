import {
   StyleSheet,
   View,
   Text,
   ScrollView,
   useWindowDimensions,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import Income from '../../assets/icons/up.svg';
import Expenses from '../../assets/icons/down.svg';
import Extra from '../../assets/icons/more.svg';
import Command from '../../assets/icons/command.svg';
import Menu from '../../assets/icons/menu.svg';
import Card from '../../assets/icons/tarjeta.svg';
import Cash from '../../assets/icons/efectivo.svg';
import {BarChart} from 'react-native-gifted-charts';

const InfoPaidCommands = ({commands, costs, listProducts}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);
   const {height, width} = useWindowDimensions();
   const size = 25;
   const sizeM = 15;
   const sizeS = 10;
   const [maxWidth, setMaxWidth] = useState(width * 0.85 - 35);
   const [widthChart, setWidth] = useState(200);
   const [heightChart, setHeight] = useState(130);
   const [number, setNumber] = useState(0);
   const [income, setIncome] = useState(0);
   const [expenses, setExpenses] = useState(0);
   const [tip, setTip] = useState(0);
   const [products, setProducts] = useState(0);
   const [profits, setProfits] = useState(0);
   const [cash, setCash] = useState(0);
   const [data, setData] = useState([]);
   const [maxData, setMaxData] = useState(5);

   useEffect(() => {
      const heightBar = height - 670;
      //console.log(height, heightBar);
      if (heightBar > 130) {
         setHeight(heightBar);
      } else {
         setHeight(130);
      }

      const widthMax = width * 0.85 - 35;
      setMaxWidth(widthMax);

      const widthBar = data.length * 45 + 15;
      if (widthBar < widthMax) {
         if (widthBar > 200) {
            setWidth(widthBar);
         } else {
            setWidth(200);
         }
      } else {
         setWidth(widthMax); //!!!
      }
   }, [width, height]);

   useEffect(() => {
      if (commands) {
         const numberCommands = commands.length;

         const {calcIncome, calcTip, cashCount, cardCount} = commands.reduce(
            (acc, command) => {
               acc.calcIncome += command.subtotal || 0;
               acc.calcTip += command.tip || 0;
               if (command.method === 'efectivo') {
                  acc.cashCount++;
               } else if (command.method === 'tarjeta') {
                  acc.cardCount++;
               }
               return acc;
            },
            {calcIncome: 0, calcTip: 0, cashCount: 0, cardCount: 0},
         );

         const calcCash =
            numberCommands != 0 ? (cashCount / numberCommands) * 100 : 0;

         const calcExpenses = costs.reduce(
            (total, cost) => total + cost.amount,
            0,
         );

         /* let productData = [];
         commands.forEach(item => {
            let calcProductQuantity = {};
            item.products.forEach(product => {
               const productId = product.id;
               const quantity = product.quantity;
               calcProductQuantity[productId] =
                  (calcProductQuantity[productId] || 0) + quantity;
            });
            productData = productData.concat(
               Object.entries(calcProductQuantity).map(([id, value]) => ({
                  id,
                  value,
                  label:
                     listProducts.find(item => item.id === parseFloat(id))
                        ?.product || '-----',
               })),
            );
         });*/

         let calcProductQuantity = {};
         commands.forEach(item => {
            item.products.forEach(product => {
               const productId = product.id;
               const quantity = product.quantity;
               calcProductQuantity[productId] =
                  (calcProductQuantity[productId] || 0) + quantity;
            });
         });

         const productData = Object.entries(calcProductQuantity).map(
            ([id, value]) => ({
               //id,
               value,
               label:
                  listProducts.find(item => item.id === parseFloat(id))
                     ?.product || '-----',
            }),
         );
         const maxValue = productData.reduce(
            (max, current) => (current.value > max ? current.value : max),
            0,
         );
         //console.log(productData);

         const calcProducts = productData.reduce(
            (accumulator, currentValue) => accumulator + currentValue.value,
            0,
         );

         const widthBar = productData.length * 45 + 15;
         if (widthBar < maxWidth) {
            if (widthBar > 200) {
               setWidth(widthBar);
            } else {
               setWidth(200);
            }
         } else {
            setWidth(maxWidth);
         }

         setNumber(numberCommands);
         setData(productData);
         maxValue > 5 ? setMaxData(maxValue) : setMaxData(5);
         setIncome(calcIncome);
         setCash(calcCash);
         setTip(calcTip);
         setExpenses(calcExpenses);
         setProducts(calcProducts);
         setProfits(calcIncome - calcExpenses);
      }
   }, [commands, costs]);

   return (
      <ScrollView style={styles.scroll}>
         <View style={styles.container}>
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
                        <Expenses
                           width={size}
                           height={size}
                           fill={colors.nok}
                        />
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
            <View style={styles.quantityContainer}>
               <View style={styles.data}>
                  <View style={styles.status}>
                     <Command
                        width={sizeM}
                        height={sizeM}
                        fill={colors.color1}
                     />
                     <Text style={styles.text}> Comandas pagadas</Text>
                  </View>
                  <Text style={{...styles.text, color: colors.color1}}>
                     {'  '}
                     {number}
                  </Text>
               </View>
               <View style={styles.data}>
                  <View style={styles.statusMethod}>
                     <View style={styles.oval}>
                        <Cash
                           width={sizeS}
                           height={sizeS}
                           fill={colors.background}
                        />
                     </View>
                     <Text style={styles.text}> {cash} %</Text>
                  </View>
                  <View style={styles.statusMethod}>
                     <View style={styles.oval}>
                        <Card
                           width={sizeS}
                           height={sizeS}
                           fill={colors.background}
                        />
                     </View>
                     <Text style={styles.text}>
                        {' '}
                        {number != 0 ? 100 - cash : 0} %
                     </Text>
                  </View>
               </View>
               <View style={styles.data}>
                  <View style={styles.status}>
                     <Menu width={sizeM} height={sizeM} fill={colors.color1} />
                     <Text style={styles.text}> Productos vendidos</Text>
                  </View>
                  <Text style={{...styles.text, color: colors.color1}}>
                     {'  '}
                     {products}
                  </Text>
               </View>
            </View>
            <View style={styles.chartContainer}>
               <BarChart
                  noOfSections={5}
                  barBorderTopLeftRadius={radius.xs}
                  barBorderTopRightRadius={radius.xs}
                  frontColor={colors.color1}
                  data={data}
                  spacing={spacing.m}
                  xAxisLabelTextStyle={{
                     ...styles.text,
                     lineHeight: spacing.l,
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
                  xAxisLabelsVerticalShift={25}
                  labelWidth={55}
                  xAxisTextNumberOfLines={2}
                  width={widthChart}
                  //xAxisLength={widthChart}
                  //rulesLength={widthChart}
                  scrollToEnd={true}
                  height={heightChart}
                  maxValue={maxData}
               />
            </View>
         </View>
      </ScrollView>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      scroll: {
         width: '100%',
      },
      container: {
         width: '100%',
         //flex: 1,
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         borderRadius: radius.s,
         marginVertical: spacing.l,
      },
      quantityContainer: {
         //width: '100%',
         width: 350,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: radius.s,
         marginVertical: spacing.xl,
      },
      moneyContainer: {
         //width: '80%',
         width: 320,
         flexDirection: 'column',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      balanceContainer: {
         width: '100%',
         alignItems: 'center',
         borderBottomColor: colors.surface,
         borderBottomWidth: 1,
      },
      chartContainer: {
         //width: '85%',
         flex: 1,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         paddingRight: spacing.xl * 2,
      },
      statusSimple: {
         width: '80%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingBottom: spacing.xxs,
      },
      status: {
         width: '50%',
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      statusMethod: {
         width: '25%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      data: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         paddingBottom: spacing.xxs,
      },
      text: {
         ...typography.body,
         color: colors.typography,
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
      oval: {
         width: 25,
         height: 20,
         borderRadius: radius.m,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors.color1,
      },
   });
};

export default InfoPaidCommands;
