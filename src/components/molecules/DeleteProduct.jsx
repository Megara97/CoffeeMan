import React, { useRef, useState } from 'react';
import { Animated, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import colors from '../../assets/colors';

const DeleteProduct =({ navigation, product }) => {
    return (
        <View style={styles.WarningContainer}>
            <Text style={styles.message}> ¿Estas seguro de eliminar <Text style={styles.boldText}>"{product}"</Text>?</Text>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                    <CustomButton type={6}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                    <CustomButton type={5}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    WarningContainer: {
        width: '80%',
        height: 170,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',    
        backgroundColor: colors.gray2,
        borderRadius:7,
    },
    message:{
        fontSize: 15,
        fontFamily: "Jaldi-Regular",
        color: colors.typography,
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
    },
    boldText:{
        fontFamily: "Jaldi-Bold",
    },
    buttons: {
        width: '100%',
        //height: 150,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 50,
        alignItems:'center',    
        paddingVertical: 10,
    },
});

export default DeleteProduct
