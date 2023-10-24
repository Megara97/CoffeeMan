import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PayCommand from '../components/organisms/PayCommand';
import DetailsList from '../components/molecules/DetailsListSimple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../styles/index';

const Pay = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [title, setTitle] = useState('');

   useEffect(() => {
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

   return (
      <View style={styles.container}>
         <View style={styles.principal}>
            <Text style={styles.title}> {title} </Text>
            <DetailsList navigation={navigation} id={route.params.id} />
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
         color: colors.typography,
         ...typography.title,
      },
   });
};

export default Pay;
