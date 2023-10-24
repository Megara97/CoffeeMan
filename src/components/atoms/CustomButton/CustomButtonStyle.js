import {useThemeColors} from '../../../customHooks/useThemeColors';
const {StyleSheet} = require('react-native');

const ComponentStyle = colors => {
   //const colors = useThemeColors();

   return StyleSheet.create({
      circle: {
         width: 60,
         height: 60,
         borderRadius: 17,
         backgroundColor: colors.color,
         alignItems: 'center',
         justifyContent: 'center',
      },
      shadow: {
         distance: 5,
         startColor: colors.typography + '25',
         endColor: colors.background,
         offset: [2, 2],
      },
   });
};

export default ComponentStyle;
