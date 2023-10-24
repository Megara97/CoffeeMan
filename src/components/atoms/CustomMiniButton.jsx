import More from '../../assets/icons/more.svg';
import Less from '../../assets/icons/less.svg';
import {useTheme} from '@react-navigation/native';

const CustomMiniButton = props => {
   const size = 15;
   const colors = useTheme().colors;
   let Icon;
   switch (props.type) {
      case 1: //+
         Icon = <Less width={size} height={size} fill={colors.color1} />;
         break;
      case 2: //-
         Icon = <More width={size} height={size} fill={colors.color1} />;
         break;
      default:
         console.log('Type de CustomMiniButton incorrecto');
   }
   return <>{Icon}</>;
};

export default CustomMiniButton;
