import React, { useRef, useState } from 'react';
import { Text,StyleSheet, TextInput, View } from 'react-native';
import colors from '../../assets/colors'


const InfoCommandEntry = () => {
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    return (
        <View style={styles.infoContainer}>
            <Input value={name} onChange={setName} placeholder="Nombre" size={15}/>
            <Input
                value={notes}
                onChange={setNotes}
                placeholder="Notas"
                multiline
                size={13}
            />
        </View>
    );
};

function Input({ value, onChange, placeholder, multiline , size}) {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.placeholder, { fontSize: size }]}>
                {placeholder}
            </Text>
            <TextInput
                style={[
                    styles.input,
                    multiline, { fontSize: size },
                ]}
                onChangeText={onChange}
                multiline={multiline}
                value={value}
            />
        </View>
    );
}

const styles= StyleSheet.create({
    infoContainer:{
        width: '90%',
        height: 80,
        backgroundColor: colors.gray2,
        flexDirection: 'column',
        justifyContent: 'space-evenly', //center
        alignItems:'center',
        borderRadius: 7, 
    },
    inputContainer: {
        display: 'flex',
        width:'90%',
        height:'40%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center',
    },
    input: {
        flex:1,
        paddingHorizontal: 10,
        backgroundColor: colors.background,
        paddingVertical: 0,
        height:'100%',
        fontFamily: "Imprima-Regular",
    },
    placeholder: {
        width:50,
        color: colors.typography,
        fontFamily: "Jaldi-Regular",
    },
});

export default InfoCommandEntry;