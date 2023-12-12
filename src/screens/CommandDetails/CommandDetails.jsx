import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import InfoCommand from '../../components/atoms/InfoCommand';
import BottomCommand from '../../components/molecules/BottomCommand';
import DetailsList from '../../components/molecules/DetailsListGeneral';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';
import {useTheme} from '@react-navigation/native';
import {fetchDataCommandDetails} from './fetchDataCommandDetails';
import ComponentStyle from './CommandDetailsStyle';
import {typography, spacing, radius} from '../../styles/index';

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
            const command = await fetchDataCommandDetails(route.params.id);
            setList(command.products);
            setName(command.client);
            setNotes(command.notes);
            setNumber(
               command.products.reduce(
                  (total, product) => total + product.quantity,
                  0,
               ),
            );
            setSubtotal(command.subtotal);
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
                  onPress={() => {
                     //navigation.navigate('Commands', {
                     navigation.navigate('ActiveCommands', {
                        change: 'Volver' + route.params.id + name + subtotal,
                     });
                     navigation.navigate('Commands', {
                        change: 'CambioA' + route.params.id + name + subtotal,
                     });
                  }}>
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

/*const ComponentStyle = colors => {
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
         flex: 1,
         justifyContent: 'flex-start',
         alignItems: 'center',
         marginVertical: spacing.s,
      },
      containerTop: {
         width: '90%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginBottom: spacing.s,
      },
      bottom: {
         width: '100%',
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
         marginTop: spacing.xs,
      },
   });
};*/

export default CommandDetails;
