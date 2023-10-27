import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import {usePartLocalStorage} from '../../customHooks/usePartLocalStorage';

const InfoCommandEntry = ({id, name, setName, notes, setNotes}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [command, deleteCommand, changeCommand] = usePartLocalStorage(
      'commands',
      id,
   );

   const commandChanges = (key, value) => {
      if (key === 'client') {
         setName(value);
      } else if (key === 'notes') {
         setNotes(value);
      }
      if (command) {
         let newValue = {...command};
         //newValue.client = name;
         //newValue.notes = notes;
         newValue[key] = value;
         changeCommand(newValue);
      }
   };

   /*const onSave = async (key, value) => {
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
   };*/

   return (
      <View style={styles.infoContainer}>
         <View style={styles.inputContainer}>
            <TextInput
               style={[styles.input]}
               onChangeText={text => commandChanges('client', text)}
               value={name}
               placeholder={'Comanda ' + id}
               placeholderTextColor={colors.overlay}
            />
         </View>
         <View style={styles.inputContainer}>
            <TextInput
               style={[styles.input, {fontSize: 13}]}
               onChangeText={text => commandChanges('notes', text)}
               value={notes}
               placeholder={'Notas'}
               placeholderTextColor={colors.overlay}
               multiline
            />
         </View>
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      infoContainer: {
         width: '80%', //'90%',
         height: 80,
         backgroundColor: colors.secondary,
         flexDirection: 'column',
         justifyContent: 'space-evenly',
         alignItems: 'center',
         borderRadius: radius.s,
      },
      inputContainer: {
         width: '90%',
         height: '35%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      input: {
         width: '100%',
         height: '100%',
         paddingVertical: 0,
         paddingHorizontal: spacing.s,
         backgroundColor: colors.background,
         color: colors.typography,
         ...typography.title,
      },
   });
};

export default InfoCommandEntry;
