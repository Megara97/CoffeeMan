import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../assets/colors';
import NewProduct from '../components/molecules/NewProduct';
import {useTheme} from '@react-navigation/native';

const NewMenu = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = StyleSheet.create({
      container: {
         backgroundColor: colors.background,
         width: '100%',
         flex: 1,
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
      },
   });

   return (
      <View style={styles.container}>
         <NewProduct navigation={navigation} />
      </View>
   );
};

export default NewMenu;
