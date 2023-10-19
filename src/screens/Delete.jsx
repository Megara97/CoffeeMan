import React from 'react';
import {View, StyleSheet} from 'react-native';
import DeleteProduct from '../components/molecules/DeleteProduct';
import colors from '../assets/colors';
import {useTheme} from '@react-navigation/native';

const Delete = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = StyleSheet.create({
      container: {
         backgroundColor: colors.background,
         width: '100%',
         flex: 1,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
      },
   });

   return (
      <View style={styles.container}>
         <DeleteProduct navigation={navigation} id={route.params.id} />
      </View>
   );
};

export default Delete;
