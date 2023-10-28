import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CommandList from '../components/molecules/CommandList';
import PaidList from '../components/molecules/PaidList';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../styles/index';
import {useLocalStorage} from '../customHooks/useLocalStorage';
import InfoPaidCommand from '../components/organisms/InfoPaidCommand';

const Reports = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [list, setList] = useLocalStorage('commands', [], route.params);
   const [commands, setCommands] = useState([]);

   useEffect(() => {
      const paidCommands = list.filter(item => item.status === 'paid');
      setCommands(paidCommands);
   }, [list]);

   return (
      <View style={styles.container}>
         <View style={styles.principal}>
            <Text style={styles.title}> Comandas pagadas </Text>
            <View style={styles.list}>
               <PaidList navigation={navigation} list={commands} />
            </View>
         </View>
         <View style={styles.bottom}>
            <InfoPaidCommand navigation={navigation} list={commands} />
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
