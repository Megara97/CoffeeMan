import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../assets/colors';
import InfoProduct from '../components/molecules/InfoProduct';
import {useTheme} from '@react-navigation/native';

const InfoMenu = ({navigation, route}) => {
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
         <InfoProduct navigation={navigation} id={route.params.id} />
      </View>
   );
};

export default InfoMenu;
