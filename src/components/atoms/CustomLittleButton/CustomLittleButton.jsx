import {View, Text, TextInput} from 'react-native';
import Efectivo from '../../../assets/icons/efectivo.svg';
import Tarjeta from '../../../assets/icons/tarjeta.svg';
import {useTheme} from '@react-navigation/native';
import styles from './CustomLittleButtonStyle';

const CustomLittleButton = props => {
   const colors = useTheme().colors;

   switch (props.type) {
      case 1: //Efectivo
         if (props.active == true) {
            Component = (
               <Efectivo width={15} height={15} fill={colors.background} />
            );
         } else {
            Component = (
               <Efectivo width={15} height={15} fill={colors.typography} />
            );
         }
         break;
      case 2: //Tarjeta
         if (props.active == true) {
            Component = (
               <Tarjeta width={15} height={15} fill={colors.background} />
            );
         } else {
            Component = (
               <Tarjeta width={15} height={15} fill={colors.typography} />
            );
         }
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
               {' '}
               {props.text}{' '}
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
                  placeholder={props.value} //value
                  placeholderTextColor={colors.mediumGray}
                  onEndEditing={e => props.setValue(e.nativeEvent.text)} //onChangeText={props.setValue}
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
         //placeholder={props.value}
         //onEndEditing={(e) => props.setValue(e.nativeEvent.text)}
         break;
      default:
         console.log('Type de CustomLittleButton incorrecto');
   }

   return (
      <View
         style={[
            [styles.oval, props.type === 4 && styles.ovalLarge],
            {
               backgroundColor: props.active ? colors.color : colors.gray1,
            },
         ]}>
         {Component}
      </View>
   );
};

export default CustomLittleButton;
