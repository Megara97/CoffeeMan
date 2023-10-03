import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import CustomButton from '../components/atoms/CustomButton';

const Commands = ({navigation , route}) => {
    return (
        <View style={styles.container}>
            <View style={styles.commandList}>
                <Text>Comandas</Text>
            </View>  
            <View style={styles.new}>
                <TouchableOpacity onPress={() => navigation.navigate('CommandDetails', {id: 1})} >
                    <CustomButton type={1}/>
                </TouchableOpacity>
            </View>
        </View>
    );  
};

const styles= StyleSheet.create({
    container:{
        width: '100%',
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //height: '90%',
        borderWidth: 2,
    },
    commandList:{
        flex:1,
        width: '100%',
        //height: '90%',
        borderWidth: 2,
    },
    new:{
        flex:0,
        width: '100%',
        height: 80,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
        //paddingLeft:'5%'
    },
    section:{
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        //paddingRight:'5%'
    },
    image:{
        width: 30, 
        height: 30, 
        //borderRadius: 15
    },
    title:{
        //color: colors.background,
        fontSize: 15,
        fontFamily: "Imprima-Regular",
    },
});

export default Commands;

//Opción donde se le pasa navigation como prop a CustomButton
//<CustomButton navigation={navigation} type={1}/>