import React from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomLittleButton from '../atoms/CustomLittleButton';
import colors from '../../assets/colors';

const ButtonGroup = ({title, buttons, selectedOption, onSelect}) => {
   return (
      <View style={styles.buttonGroupContainer}>
         <Text style={styles.content}> {title} </Text>
         {buttons.map((buttonProps, i) => (
            <TouchableOpacity
               key={i}
               onPress={() => {
                  onSelect(i);
                  Keyboard.dismiss();
               }}
               style={styles.buttons}>
               <CustomLittleButton
                  {...buttonProps}
                  active={selectedOption === i}
                  onSelect={onSelect}
                  index={i}
               />
            </TouchableOpacity>
         ))}
      </View>
   );
};

const styles = StyleSheet.create({
   buttonGroupContainer: {
      width: '100%',
      height: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   content: {
      fontSize: 13,
      fontFamily: 'Jaldi-Regular',
      color: colors.typography,
      paddingHorizontal: 10,
   },
   buttons: {
      paddingHorizontal: 5,
   },
});

export default ButtonGroup;

/* Ejemplo de llamada:

const [selectedOption, setSelectedOption] = useState(0);

                <ButtonGroup
                    title="Método de pago"
                    buttons={[{type:1, text:''},{type:2, text:''},]}
                    selectedOption={selectedOption}
                    onSelect={setSelectedOption}
                />
*/
