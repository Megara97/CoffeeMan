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

const InfoProduct =({ navigation,product }) => {
    let precio =25; 
    const [price, setPrice] = useState(precio);
    return (
        <Shadow {...ShadowPresets.general}>
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.textName}> {product} </Text>
                <View style={styles.price}>
                    <Text style={styles.textPrice}> Precio  $  </Text>
                    <TextInput style={styles.input} onChangeText={setPrice} value={price} keyboardType='numeric' />
                </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                    <CustomButton type={3}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Delete', {product: product})} >
                    <CustomButton type={4}/>
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
        width: '100%', //80
        //height: 150,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center', 
        paddingBottom:15, 
    },
    price: {
        width: '100%', //80
        //height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',    
    },
    buttons: {
        width: '100%',
        //height: 150,
        flexDirection: 'row',
        //justifyContent: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 100,
        //marginHorizontal:
        alignItems:'center',    
        paddingBottom: 25,
    },
    input: {
        //flex:1,
        width:60,
        paddingHorizontal: 10,
        backgroundColor: colors.background,
        paddingVertical: 0,
        //height:'100%',
        fontFamily: "Jaldi-Regular",
        fontSize:13,
        textAlign:'center',
    },
    textName: {
        color: colors.typography,
        fontFamily: "Jaldi-Bold",
        fontSize:15,
        paddingBottom:5,
    },
    textPrice: {
        color: colors.typography,
        fontFamily: "Jaldi-Regular",
        fontSize:13,
    },
});

export default InfoProduct
