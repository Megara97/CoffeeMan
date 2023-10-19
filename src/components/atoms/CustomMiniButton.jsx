import {StyleSheet, View} from 'react-native';
import colors from '../../assets/colors';
import More from '../../assets/icons/more.svg';
import Less from '../../assets/icons/less.svg';
import {useTheme} from '@react-navigation/native';

const CustomMiniButton = props => {
   const colors = useTheme().colors;
   let Icon;
   switch (props.type) {
      case 1: //+
         Icon = <Less width={15} height={15} fill={colors.color} />;
         break;
      case 2: //-
         Icon = <More width={15} height={15} fill={colors.color} />;
         break;
      default:
         console.log('Type de CustomButton incorrecto');
   }

   return <View style={styles.icon}>{Icon}</View>;
};

const styles = StyleSheet.create({
   icon: {
      width: 15,
      height: 15,
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export default CustomMiniButton;
