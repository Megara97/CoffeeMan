import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import InfoCommand from '../components/atoms/InfoCommand';
import BottomCommand from '../components/molecules/BottomCommand';
//import DetailsList from '../components/organisms/DetailsList';
import DetailsList from '../components/organisms/DetailsListGeneral';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../styles/index';

const CommandDetails = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [name, setName] = useState('');
   const [notes, setNotes] = useState('');
   const [numberProducts, setNumber] = useState(0);
   const [subtotal, setSubtotal] = useState(0);
   const [change, setChange] = useState('');
   const [list, setList] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const currentValue = await AsyncStorage.getItem('commands');
            const currentProducts = await AsyncStorage.getItem('products');

            let productList = [];
            if (currentProducts) {
               productList = JSON.parse(currentProducts);
            } /**/

            if (currentValue) {
               let commands = JSON.parse(currentValue);
               const index = commands.findIndex(
                  element => element.id === route.params.id,
               );
               if (index !== -1) {
                  setName(commands[index].client);
                  setNotes(commands[index].notes);
                  setNumber(
                     commands[index].products.reduce(
                        (total, product) => total + product.quantity,
                        0,
                     ),
                  );
                  setSubtotal(commands[index].subtotal);
                  commands[index].products.forEach(productInOrder => {
                     const productInfo = productList.find(
                        productInfo =>
                           productInfo.product === productInOrder.product,
                     );
                     if (productInfo) {
                        productInOrder.price = productInfo.price;
                     }
                  });
                  setList(commands[index].products); /**/
               }
            }
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, [change, route.params]);

   return (
      <View style={styles.container}>
         <View style={styles.principal}>
            <View style={styles.containerTop}>
               <TouchableOpacity
                  onPress={() =>
                     navigation.navigate('Commands', {
                        change: 'Volver' + route.params.id + name + subtotal,
                     })
                  }>
                  <CustomButton type={7} />
               </TouchableOpacity>
               <InfoCommand
                  id={route.params.id}
                  name={name}
                  setName={setName}
                  notes={notes}
                  setNotes={setNotes}
               />
            </View>
            <DetailsList
               navigation={navigation}
               id={route.params.id}
               list={list}
               change={change}
               setChange={setChange}
               dynamic
            />
         </View>
         <View style={styles.bottom}>
            <BottomCommand
               navigation={navigation}
               id={route.params.id}
               numberProducts={numberProducts}
               subtotal={subtotal}
            />
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
      containerTop: {
         width: '90%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginVertical: spacing.s,
      },
      principal: {
         width: '100%',
         height: '77%',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      bottom: {
         width: '100%',
         height: '23%',
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
      },
   });
};

export default CommandDetails;
