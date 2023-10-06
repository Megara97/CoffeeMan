import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import PayCommand from '../components/molecules/PayCommand'
import colors from '../assets/colors';


const Pay = ({navigation , route}) => {
  return (
    <View style={styles.container}>
      <Text> Pago </Text>
      <PayCommand navigation={navigation}/>
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
});

export default Pay;