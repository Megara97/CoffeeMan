import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import InfoCommandEntry from '../components/molecules/InfoCommandEntry';
import colors from '../assets/colors'
import MenuCommand from '../components/molecules/BottomCommand';

//<Text> Comanda {route.params.id}  </Text>
const CommandDetails = ({navigation , route}) => {
  return (
    <View style={styles.container}>
      <InfoCommandEntry/>
      <MenuCommand navigation={navigation}/>
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
      //height: '90%',
      backgroundColor: colors.background,
  },
});

export default CommandDetails;