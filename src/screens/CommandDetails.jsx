import React from 'react';
import {StyleSheet, View} from 'react-native';
import InfoCommandEntry from '../components/molecules/InfoCommandEntry';
import colors from '../assets/colors'
import BottomCommand from '../components/molecules/BottomCommand';
import DetailsList from '../components/molecules/DetailsList';

const CommandDetails = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}></View>
        <InfoCommandEntry id={route.params.id}/>
        <DetailsList navigation={navigation} id={route.params.id}/>
      <View style={styles.container}></View>
      <BottomCommand navigation={navigation} id={route.params.id}/>
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
  containerTop:{
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default CommandDetails;