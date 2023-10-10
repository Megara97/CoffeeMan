import React, { useRef, useState } from 'react';
import { Animated, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import colors from '../../assets/colors';
import { Shadow } from 'react-native-shadow-2';

const ShadowPresets = {
    general: {
        distance:10, 
        startColor:colors.typography+ "30", 
        endColor:colors.background, 
        style:{
            borderTopStartRadius: 17, 
            borderTopRightRadius: 17,
            flexDirection: 'row',
        },
    },
};

const NewProduct =({ navigation }) => {
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');

    return (
        <Shadow {...ShadowPresets.general}>
        <View style={styles.container}>
            <View style={styles.info}>
            <TextInput style={[styles.input , {fontSize:15, width:250,}]}  onChangeText={setName} value={name} placeholder='Producto' />
                <View style={styles.price}>
                    <Text style={styles.textPrice}> Precio  $  </Text>
                    <TextInput style={[styles.input , {fontSize:13, width:60,}]} onChangeText={setPrice} value={price} keyboardType='numeric' />
                </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                    <CustomButton type={3}/>
                </TouchableOpacity>
            </View>
        </View>
        </Shadow>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%', //80
        height: 180,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems:'center',    
        backgroundColor: colors.gray2,
        borderTopLeftRadius:17,
        borderTopRightRadius:17,
    },
    info: {
        width: '100%', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center', 
        paddingBottom:15, 
    },
    price: {
        width: '100%', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',    
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 100,
        alignItems:'center',    
        paddingBottom: 25,
    },
    input: {
        paddingHorizontal: 10,
        backgroundColor: colors.background,
        paddingVertical: 0,
        fontFamily: "Jaldi-Regular",
        textAlign:'center',
    },
    textPrice: {
        color: colors.typography,
        fontFamily: "Jaldi-Regular",
        fontSize:13,
    },
});

export default NewProduct
