import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import InfoCommandEntry from '../components/molecules/InfoCommandEntry';
import colors from '../assets/colors';
import BottomCommand from '../components/molecules/BottomCommand';
import DetailsList from '../components/molecules/DetailsList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/atoms/CustomButton';

const CommandDetails = ({navigation, route}) => {
   const [name, setName] = useState('');
   const [notes, setNotes] = useState('');
   const [numberProducts, setNumber] = useState(0);
   const [subtotal, setSubtotal] = useState(0);
   const [change, setChange] = useState('');
   const [list, setList] = useState([]);

   console.log(route.params);

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
         <View style={styles.containerTop}>
            <TouchableOpacity
               onPress={() =>
                  navigation.navigate('Commands', {
                     change: 'Volver' + route.params.id + name + subtotal,
                  })
               }>
               <CustomButton type={7} />
            </TouchableOpacity>
            <InfoCommandEntry
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
         />
         <BottomCommand
            navigation={navigation}
            id={route.params.id}
            numberProducts={numberProducts}
            subtotal={subtotal}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '100%',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 10,
      //height: '90%',
      backgroundColor: colors.background,
   },
   containerTop: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
});

export default CommandDetails;
