import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import colors from '../assets/colors';
import NewProduct from '../components/molecules/NewProduct';

const NewMenu = ({navigation , route}) => {
    return (
        <View style={styles.container}>
          <NewProduct navigation={navigation} />
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

export default NewMenu;


