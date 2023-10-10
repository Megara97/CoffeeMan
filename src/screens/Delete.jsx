import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import DeleteProduct from '../components/molecules/DeleteProduct';
import colors from '../assets/colors';

const Delete = ({navigation , route}) => {
    return (
        <View style={styles.container}>
          <DeleteProduct navigation={navigation} product={route.params.product}/>
        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        backgroundColor: colors.background,
        width: '100%',
        //height: '90%',
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    });



export default Delete;


