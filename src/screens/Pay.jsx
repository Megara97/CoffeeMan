import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PayCommand from '../components/organisms/PayCommand';
import DetailsList from '../components/molecules/DetailsListGeneral';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../styles/index';
import {usePartLocalStorage} from '../customHooks/usePartLocalStorage';
import {useLocalStorage} from '../customHooks/useLocalStorage';

const Pay = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [title, setTitle] = useState('');
   //const [list, setList] = useState([]);

   //const [products] = useLocalStorage('products');
   const [command] = usePartLocalStorage('commands', route.params.id);

   useEffect(() => {
      if (command) {
         setTitle(
            command.client === '' ? 'Comanda ' + command.id : command.client,
         );

         /* //Copia de la comanda donde se agrega el precio y el nombre de cada producto
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
         setList(details.products);*/
      }
   }, [command]);

   /*const [command] = usePartLocalStorage('commands', route.params.id);

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
      if (command) {
         setTitle(
            command.client === '' ? 'Comanda ' + command.id : command.client,
         );
      }
   }, [command]);*/

   /*useEffect(() => {
      const fetchData = async () => {
         try {
            const storedList = await AsyncStorage.getItem('commands');

            if (storedList) {
               let commands = JSON.parse(storedList);
               const index = commands.findIndex(
                  element => element.id === route.params.id,
               );
               if (index !== -1) {
                  setTitle(
                     commands[index].client === ''
                        ? 'Comanda ' + commands[index].id
                        : commands[index].client,
                  );
               }
            }
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, []);
*/
   return (
      <View style={styles.container}>
         <View style={styles.principal}>
            <Text style={styles.title}> {title} </Text>
            <DetailsList
               navigation={navigation}
               id={route.params.id}
               //list={list}
            />
         </View>
         <View style={styles.bottom}>
            <PayCommand navigation={navigation} id={route.params.id} />
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
      principal: {
         width: '100%',
         height: '57%',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      bottom: {
         width: '100%',
         height: '43%',
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
      },
      title: {
         marginBottom: spacing.xs,
         color: colors.typography,
         ...typography.title,
      },
   });
};

export default Pay;
