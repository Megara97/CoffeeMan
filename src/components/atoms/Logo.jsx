import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/colors';
import imageLogo from '../../assets/images/Calcifer.png';
import {useTheme} from '@react-navigation/native';

const Logo = ({navigation}) => {
   const colors = useTheme().colors;

   const styles = StyleSheet.create({
      circle: {
         width: 70,
         height: 70,
         borderRadius: 35,
         backgroundColor: colors.gray1,
         alignItems: 'center',
         justifyContent: 'center',
      },
      image: {
         width: 50,
         height: 50,
      },
   });

   return (
      //<TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <View style={styles.circle}>
         <Image source={imageLogo} style={styles.image} />
      </View>
      //</TouchableOpacity>
   );
};

export default Logo;

//Otra forma de llamar el archivo de imagen para utilizarlo
//const imageLogo = require('../../assets/images/Calcifer.png');
