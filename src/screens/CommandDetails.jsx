import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import InfoCommand from '../components/atoms/InfoCommand';
import BottomCommand from '../components/molecules/BottomCommand';
import DetailsList from '../components/molecules/DetailsListGeneral';
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
            const productsList = await AsyncStorage.getItem('products');
            const products = productsList ? JSON.parse(productsList) : [];
            const commandsList = await AsyncStorage.getItem('commands');
            const commands = commandsList ? JSON.parse(commandsList) : [];
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
               //Agregar el precio y el nombre de cada producto de la comanda
               commands[index].products.forEach(productInOrder => {
                  const productInfo = products.find(
                     productInMenu => productInMenu.id === productInOrder.id,
                  );
                  if (productInfo) {
                     productInOrder.price = productInfo.price;
                     productInOrder.product = productInfo.product;
                  }
               });
               setList(commands[index].products);
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

/* 
   //No se actualiza al agregar o eliminar productos desde la screen Products
   //Se probo pasar màs parametros como change al hook y obtener fetchData desde el hook y usarlo en el useEffect
   const [command, products] = useCombineLocalStorage(route.params.id, change);

   useEffect(() => {
      if (command) {
         setName(command.client);
         setNotes(command.notes);
         setNumber(
            command.products.reduce(
               (total, product) => total + product.quantity,
               0,
            ),
         );
         setSubtotal(command.subtotal);

         //Copia de la comanda donde se agrega el precio y el nombre de cada producto
         let details = {...command};
         details.products.forEach(productInOrder => {
            const productInfo = products.find(
               productInMenu => productInMenu.id === productInOrder.id,
            );
            if (productInfo) {
               productInOrder.price = productInfo.price;
               productInOrder.product = productInfo.product;
            }
         });
         setList(details.products);
      }
   }, [change, route.params, command, products]);*/
