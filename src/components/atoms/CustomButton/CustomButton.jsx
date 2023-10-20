import {StyleSheet, View} from 'react-native';
import colors from '../../../assets/colors';
import New from '../../../assets/icons/more.svg';
import Pay from '../../../assets/icons/pay.svg';
import Save from '../../../assets/icons/save.svg';
import Delete from '../../../assets/icons/delete.svg';
import Accept from '../../../assets/icons/accept.svg';
import Cancel from '../../../assets/icons/cancel.svg';
import Back from '../../../assets/icons/back.svg';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '@react-navigation/native';
import ComponentStyle from './CustomButtonStyle';

const CustomButton = props => {
   const colors = useTheme().colors;
   const styles = ComponentStyle();

   const ShadowPresets = {
      general: {
         distance: 5,
         startColor: colors.typography + '25',
         endColor: colors.background,
         offset: [2, 4],
      },
   };

   /*const styles = StyleSheet.create({
      circle: {
         width: 60,
         height: 60,
         borderRadius: 30,
         backgroundColor: colors.color,
         alignItems: 'center',
         justifyContent: 'center',
         //elevation:7,
      },
      icon: {
         width: 25,
         height: 25,
      },
   });*/

   let Icon;
   switch (props.type) {
      case 1: //Nuevo
         Icon = <New width={20} height={20} fill={colors.background} />;
         break;
      case 2: //Pagar
         Icon = <Pay width={20} height={20} fill={colors.background} />;
         break;
      case 3: //Guardar
         Icon = <Save width={20} height={20} fill={colors.background} />;
         break;
      case 4: //Borrar
         Icon = <Delete width={20} height={20} fill={colors.background} />;
         break;
      case 5: //Aceptar
         Icon = <Accept width={20} height={20} fill={colors.background} />;
         break;
      case 6: //Cancelar
         Icon = <Cancel width={15} height={15} fill={colors.background} />;
         break;
      case 7: //Regresar
         Icon = <Back width={25} height={25} fill={colors.background} />;
         break;
      default:
         console.log('Type de CustomButton incorrecto');
   }

   return (
      <Shadow {...ShadowPresets.general}>
         <View style={styles.circle}>{Icon}</View>
      </Shadow>
   );
};
//<Shadow {...styles.ShadowPresets}>

export default CustomButton;
