import React from 'react';
import {Text, View, Button, TouchableOpacity, StyleSheet} from 'react-native';
import ProductList from '../components/molecules/ProductList';
import CustomButton from '../components/atoms/CustomButton';
import colors from '../assets/colors'

const Menu = ({navigation , route}) => {
  return (
    <View style={styles.container}>
      <View style={styles.commandList}>
          <ProductList navigation={navigation}/>
      </View>  
      <View style={styles.new}>
          <TouchableOpacity onPress={() => navigation.navigate('CommandDetails', {id: 1})} >
              <CustomButton type={1}/>
          </TouchableOpacity>
      </View>
  </View>
  );  
};

const styles= StyleSheet.create({
container:{
    backgroundColor: colors.background,
    width: '100%',
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    //height: '90%',
},
commandList:{
    //flex:1,
    width: '100%',
    //height: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
},
new:{
    //flex:0,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
},
});

export default Menu;

