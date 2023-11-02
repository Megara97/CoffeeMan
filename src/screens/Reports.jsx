import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CommandList from '../components/molecules/CommandListGeneral';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../styles/index';
import {useLocalStorage} from '../customHooks/useLocalStorage';
import InfoPaidCommands from '../components/atoms/InfoPaidCommands';
import PeriodSelector from '../components/organisms/PeriodSelector';

const Reports = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [list, setList] = useLocalStorage('commands', [], route.params);
   const [commands, setCommands] = useState([]);
   const [selectedPeriod, setSelectedPeriod] = useState();

   useEffect(() => {
      const paidCommands = list.filter(item => item.status === 'paid');
      const filteredCommands = paidCommands.filter(item => {
         const itemDate = new Date(item.date);
         return itemDate >= selectedPeriod[0] && itemDate <= selectedPeriod[1];
      });
      setCommands(filteredCommands);
   }, [list, selectedPeriod]);

   return (
      <View style={styles.container}>
         <View style={styles.principal}>
            <Text style={styles.title}> Comandas pagadas </Text>
            <PeriodSelector setSelection={setSelectedPeriod} />
            <View style={styles.list}>
               <CommandList navigation={navigation} list={commands} paid />
            </View>
         </View>
         <View style={styles.bottom}>
            <InfoPaidCommands navigation={navigation} list={commands} />
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
         height: '83%',
         flexDirection: 'column',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      list: {
         width: '100%',
         height: '95%',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      title: {
         height: '5%',
         marginBottom: spacing.xs,
         color: colors.typography,
         ...typography.title,
      },
      bottom: {
         width: '100%',
         height: '17%',
         flexDirection: 'column',
         justifyContent: 'flex-end',
         paddingBottom: spacing.l,
         alignItems: 'center',
      },
   });
};

export default Reports;
