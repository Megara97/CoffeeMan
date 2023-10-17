import React from 'react';
import {Text, StyleSheet, TextInput, View} from 'react-native';
import colors from '../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InfoCommandEntry = ({id, name, setName, notes, setNotes}) => {
   const onSave = async (key, value) => {
      try {
         if (key === 'client') {
            setName(value);
         } else if (key === 'notes') {
            setNotes(value);
         }
         const currentValue = await AsyncStorage.getItem('commands');
         if (currentValue) {
            let commandList = JSON.parse(currentValue);
            const index = commandList.findIndex(element => element.id === id);
            if (index !== -1) {
               //commandList[index].client = name;
               //commandList[index].notes = notes;
               commandList[index][key] = value;
               const jsonValue = JSON.stringify(commandList);
               await AsyncStorage.setItem('commands', jsonValue);
            }
         }
      } catch (e) {
         console.error(e);
      }
   };

   return (
      <View style={styles.infoContainer}>
         <Input
            value={name}
            onChange={text => onSave('client', text)}
            placeholder="Nombre"
            size={15}
         />
         <Input
            value={notes}
            onChange={text => onSave('notes', text)}
            placeholder="Notas"
            multiline
            size={13}
         />
      </View>
   );
};

function Input({value, onChange, placeholder, multiline, size}) {
   return (
      <View style={styles.inputContainer}>
         <Text style={[styles.placeholder, {fontSize: size}]}>
            {placeholder}
         </Text>
         <TextInput
            style={[styles.input, multiline, {fontSize: size}]}
            onChangeText={onChange}
            multiline={multiline}
            value={value}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   infoContainer: {
      width: '80%', //'90%',
      height: 80,
      backgroundColor: colors.gray2,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: 7,
   },
   inputContainer: {
      display: 'flex',
      width: '90%',
      height: '40%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
   },
   input: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: colors.background,
      paddingVertical: 0,
      height: '100%',
      fontFamily: 'Jaldi-Regular',
   },
   placeholder: {
      width: 50,
      color: colors.typography,
      fontFamily: 'Jaldi-Regular',
   },
});

export default InfoCommandEntry;
