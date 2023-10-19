import {useThemeColors} from '../../../customHooks/useThemeColors';
const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
   oval: {
      width: 30,
      height: 22,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
   },
   ovalLarge: {
      width: 50,
      height: 22,
      borderRadius: 17,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      fontSize: 13,
      fontFamily: 'Jaldi-Regular',
   },
   input: {
      paddingHorizontal: 0,
      paddingVertical: 0,
      fontSize: 13,
      fontFamily: 'Jaldi-Regular',
   },
});

export default styles;
