import {View, Text, TextInput, StyleSheet} from 'react-native';
import Efectivo from '../../../assets/icons/efectivo.svg';
import Tarjeta from '../../../assets/icons/tarjeta.svg';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../../styles/index';
//import styles from './CustomLittleButtonStyle';

const CustomLittleButton = props => {
   const colors = useTheme().colors;
   const size = 15;

   const selectComponent = () => {
      let Component;
      switch (props.type) {
         case 1: //Efectivo
            Component = (
               <Efectivo
                  width={size}
                  height={size}
                  fill={props.active ? colors.background : colors.typography}
               />
            );
            break;
         case 2: //Tarjeta
            Component = (
               <Tarjeta
                  width={size}
                  height={size}
                  fill={props.active ? colors.background : colors.typography}
               />
            );
            break;
         case 3: //Texto
            Component = (
               <Text
                  style={[
                     styles.text,
                     {
                        color: props.active
                           ? colors.background
                           : colors.typography,
                     },
                  ]}>
                  {props.text}
               </Text>
            );
            break;
         case 4: //Input
            Component = (
               <View style={styles.ovalLarge}>
                  <Text
                     style={[
                        styles.text,
                        {
                           color: props.active
                              ? colors.background
                              : colors.typography,
                        },
                     ]}>
                     ${' '}
                  </Text>
                  <TextInput
                     placeholder={props.value}
                     placeholderTextColor={
                        props.active ? colors.background : colors.overlay
                     }
                     onEndEditing={e => props.setValue(e.nativeEvent.text)}
                     onFocus={() => props.onSelect(props.index)}
                     keyboardType="numeric"
                     style={[
                        styles.input,
                        {
                           color: props.active
                              ? colors.background
                              : colors.typography,
                        },
                     ]}
                  />
               </View>
            );
            //value={props.value}
            //onChangeText={props.setValue}
            break;
         default:
            console.log('Type de CustomLittleButton incorrecto');
      }
      return Component;
   };

   return (
      <View
         style={[
            [styles.oval, props.type === 4 && styles.ovalLarge],
            {
               backgroundColor: props.active ? colors.color1 : colors.surface,
            },
         ]}>
         {selectComponent()}
      </View>
   );
};

const styles = StyleSheet.create({
   oval: {
      width: 35,
      height: 26,
      borderRadius: radius.m,
      alignItems: 'center',
      justifyContent: 'center',
   },
   ovalLarge: {
      width: 55,
      height: 26,
      borderRadius: radius.m,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      ...typography.body,
   },
   input: {
      padding: 0,
      textAlign: 'center',
      ...typography.body,
   },
});

export default CustomLittleButton;
