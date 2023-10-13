import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PayCommand from '../components/molecules/PayCommand'
import colors from '../assets/colors';
import DetailsList from '../components/molecules/DetailsListSimple';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pay = ({navigation , route}) => {
  const [title, setTitle] = useState('');
    useEffect(() => {
        const fetchData = async () => {
          try {
            const storedList = await AsyncStorage.getItem('commands');

            if (storedList) {
                let commands = JSON.parse(storedList);
                const index = commands.findIndex((element) => element.id === route.params.id);
                if (index !== -1) {
                    setTitle(commands[index].client === '' ? "Comanda " + commands[index].id : commands[index].client);
                  }
            }
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}></View>
        <Text style={styles.title}> {title} </Text>
        <DetailsList navigation={navigation} id={route.params.id}/>
      <View style={styles.container}></View>
      <PayCommand navigation={navigation} id={route.params.id}/>
    </View>
  );  
};

const styles= StyleSheet.create({
  container:{
      width: '100%',
      flex:1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop:10,
      backgroundColor: colors.background,
  },
  containerTop:{
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: colors.typography,
    fontFamily: "Jaldi-Regular",
  },
});

export default Pay;