import React from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomLittleButton from '../atoms/CustomLittleButton/CustomLittleButton';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const ButtonGroup = ({
   style = {},
   title,
   buttons,
   selectedOption,
   onSelect,
}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   return (
      <View style={styles.container}>
         <Text style={{...styles.title, ...style}}> {title} </Text>
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

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '100%',
         height: 30,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      title: {
         ...typography.body,
         color: colors.typography,
         paddingHorizontal: spacing.xs,
      },
      buttons: {
         paddingHorizontal: spacing.xs,
      },
   });
};

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
