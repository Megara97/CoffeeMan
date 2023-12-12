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
            <PeriodSelector setSelection={setSelectedPeriod} />
            <InfoPaidCommands navigation={navigation} list={commands} />
         </View>
         <View style={styles.bottom}></View>
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
         flex: 1,
         justifyContent: 'flex-start',
         alignItems: 'center',
         marginVertical: spacing.s,
      },
      title: {
         marginBottom: spacing.s,
         color: colors.typography,
         ...typography.title,
      },
      bottom: {
         width: '100%',
         flexDirection: 'column',
         justifyContent: 'flex-end',
         marginBottom: spacing.l,
         alignItems: 'center',
      },
   });
};

export default Reports;
