const {StyleSheet} = require('react-native');
import {typography, spacing, radius} from '../../../styles/index';

const styles = StyleSheet.create({
   oval: {
      width: 30,
      height: 22,
      borderRadius: radius.m,
      alignItems: 'center',
      justifyContent: 'center',
   },
   ovalLarge: {
      width: 50,
      height: 22,
      borderRadius: radius.m,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      ...typography.body,
   },
   input: {
      padding: 0,
      textAlign: 'center',
      ...typography.body,
   },
});

export default styles;
