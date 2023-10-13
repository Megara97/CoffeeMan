import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../assets/colors';
import InfoProduct from '../components/molecules/InfoProduct';

const InfoMenu = ({navigation , route}) => {
    return (
        <View style={styles.container}>
          <InfoProduct navigation={navigation} id={route.params.id} />
        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        backgroundColor: colors.background,
        width: '100%',
        //height: '100%',
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
 });

export default InfoMenu;