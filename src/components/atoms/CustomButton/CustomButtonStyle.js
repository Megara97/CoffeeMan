import {useThemeColors} from '../../../customHooks/useThemeColors';
const {StyleSheet} = require('react-native');
import {typography, spacing, radius} from '../../../styles/index';

const ComponentStyle = colors => {
   //const colors = useThemeColors();

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
         distance: spacing.xs,
         ...colors.shadow,
         offset: [2, 2],
      },
   });
};

export default ComponentStyle;
