import {StyleSheet, View} from 'react-native';
import New from '../../../assets/icons/more.svg';
import Pay from '../../../assets/icons/pay.svg';
import Save from '../../../assets/icons/save.svg';
import Delete from '../../../assets/icons/delete.svg';
import Accept from '../../../assets/icons/accept.svg';
import Cancel from '../../../assets/icons/cancel.svg';
import Back from '../../../assets/icons/back.svg';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '@react-navigation/native';
//import ComponentStyle from './CustomButtonStyle';
import {typography, spacing, radius} from '../../../styles/index';

const CustomButton = props => {
   const size = 20;
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   let Icon;
   switch (props.type) {
      case 1: //Nuevo
         Icon = <New width={size} height={size} fill={colors.background} />;
         break;
      case 2: //Pagar
         Icon = <Pay width={size} height={size} fill={colors.background} />;
         break;
      case 3: //Guardar
         Icon = <Save width={size} height={size} fill={colors.background} />;
         break;
      case 4: //Borrar
         Icon = <Delete width={size} height={size} fill={colors.background} />;
         break;
      case 5: //Aceptar
         Icon = <Accept width={size} height={size} fill={colors.background} />;
         break;
      case 6: //Cancelar
         Icon = (
            <Cancel
               width={size * 0.75}
               height={size * 0.75}
               fill={colors.background}
            />
         );
         break;
      case 7: //Regresar
         Icon = (
            <Back
               width={size * 1.5}
               height={size * 1.5}
               fill={colors.background}
            />
         );
         break;
      default:
         console.log('Type de CustomButton incorrecto');
   }

   return (
      <Shadow {...styles.shadow}>
         <View style={styles.circle}>{Icon}</View>
      </Shadow>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      circle: {
         width: 60,
         height: 60,
         borderRadius: radius.m,
         backgroundColor: colors.color1,
         alignItems: 'center',
         justifyContent: 'center',
      },
      shadow: {
         //distance: 5,
         distance: spacing.xs,
         //startColor: colors.typography + '25',
         //endColor: colors.background,
         ...colors.shadow,
         offset: [2, 2],
      },
   });
};

export default CustomButton;
