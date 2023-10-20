import {useThemeColors} from '../../../customHooks/useThemeColors';
const {StyleSheet, useColorScheme} = require('react-native');
//import Theme from '../../../assets/theme';

const ComponentStyle = () => {
   //const theme = useColorScheme();
   //const colors = theme === 'dark' ? Theme.dark.colors : Theme.light.colors;
   const colors = useThemeColors();

   return StyleSheet.create({
      circle: {
         width: 60,
         height: 60,
         borderRadius: 17,
         backgroundColor: colors.color,
         alignItems: 'center',
         justifyContent: 'center',
         //elevation:7,
      },
   });
};

export default ComponentStyle;
