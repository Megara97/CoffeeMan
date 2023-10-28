import More from '../../assets/icons/more.svg';
import Less from '../../assets/icons/less.svg';
import {useTheme} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import {typography, spacing, radius} from '../../styles/index';

const CustomMiniButton = props => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);
   const sizeMax = 20;
   const size = 15;

   const selectIcon = () => {
      let Icon;
      switch (props.type) {
         case 1: //+
            Icon = (
               <Less width={sizeMax} height={sizeMax} fill={colors.color1} />
            );
            break;
         case 2: //-
            Icon = (
               <More width={sizeMax} height={sizeMax} fill={colors.color1} />
            );
            break;
         case 3: //-
            Icon = (
               <View style={styles.circle}>
                  <Less width={size} height={size} fill={colors.background} />
               </View>
            );
            break;
         default:
            console.log('Type de CustomMiniButton incorrecto');
      }
      return Icon;
   };

   return <>{selectIcon()}</>;
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      circle: {
         width: 25,
         height: 25,
         borderRadius: radius.s,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors.color1,
      },
   });
};

export default CustomMiniButton;
