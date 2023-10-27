import {StyleSheet, Image, View} from 'react-native';
import imageLogo from '../../assets/images/Calcifer.png';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const Logo = () => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   return (
      <View style={styles.circle}>
         <Image source={imageLogo} style={styles.image} />
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      circle: {
         width: 70,
         height: 70,
         borderRadius: radius.l,
         backgroundColor: colors.surface,
         alignItems: 'center',
         justifyContent: 'center',
      },
      image: {
         width: 45,
         height: 45,
      },
   });
};

export default Logo;
