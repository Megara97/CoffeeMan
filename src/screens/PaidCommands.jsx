import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CommandList from '../components/molecules/CommandListGeneral';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../styles/index';
import {useLocalStorage} from '../customHooks/useLocalStorage';
import PeriodSelector from '../components/organisms/PeriodSelector';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import DeletePaidCommands from '../components/molecules/DeletePaidCommands';
import {CommandContext} from './Commands';

const PaidCommands = ({navigation, route}) => {
   const changes = useContext(CommandContext);
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);
   const now = new Date();

   const [list, setList] = useLocalStorage('commands', [], changes);
   const [commands, setCommands] = useState([]);
   const [selectedPeriod, setSelectedPeriod] = useState([now, now]);
   const [deleteVisible, setDeleteVisible] = useState(false);
   const [response, setResponse] = useState(false);

   //console.log(changes);

   useEffect(() => {
      const paidCommands = list.filter(item => item.status === 'paid');
      const filteredCommands = paidCommands.filter(item => {
         const itemDate = new Date(item.date);
         return itemDate >= selectedPeriod[0] && itemDate <= selectedPeriod[1];
      });
      setCommands(filteredCommands);
   }, [list, selectedPeriod, changes]);

   useEffect(() => {
      if (response === true) {
         const activeCommands = list.filter(item => item.status === 'active');
         const paidCommands = list.filter(item => item.status === 'paid');
         const filteredCommands = paidCommands.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate < selectedPeriod[0] || itemDate > selectedPeriod[1];
         });
         let newValue = [...activeCommands, ...filteredCommands];
         //console.log(newValue);
         setList(newValue);
         setResponse(false);
      }
   }, [response]);

   return (
      <>
         <View style={styles.container}>
            <View style={styles.principal}>
               <PeriodSelector setSelection={setSelectedPeriod} />
               <CommandList navigation={navigation} list={commands} paid />
            </View>
            <View style={styles.new}>
               <TouchableOpacity onPress={() => setDeleteVisible(true)}>
                  <CustomButton type={4} />
               </TouchableOpacity>
            </View>
         </View>
         <DeletePaidCommands
            selectedPeriod={selectedPeriod}
            visible={deleteVisible}
            setVisible={setDeleteVisible}
            setResponse={setResponse}
         />
      </>
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
         flex: 1,
         justifyContent: 'flex-start',
         alignItems: 'center',
         marginVertical: spacing.s,
      },
      new: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'flex-end',
         alignItems: 'center',
         marginBottom: spacing.l,
         paddingHorizontal: spacing.l,
      },
   });
};

export default PaidCommands;
