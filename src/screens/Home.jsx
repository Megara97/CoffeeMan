import React, {useState} from 'react';
import {View} from 'react-native';
import SideMenu from '../components/molecules/SideMenu';
import {useTheme} from '@react-navigation/native';
//import colors from '../assets/colors';

const Home = ({navigation, route}) => {
   const colors = useTheme().colors;
   return (
      <View style={{backgroundColor: colors.background}}>
         <SideMenu navigation={navigation} />
      </View>
   );
};

export default Home;
