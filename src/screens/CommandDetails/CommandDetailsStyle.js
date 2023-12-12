const {StyleSheet} = require('react-native');
import {typography, spacing, radius} from '../../styles/index';

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '100%',
         height: '100%',
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         backgroundColor: colors.background,
      },
      principal: {
         width: '100%',
         flex: 1,
         justifyContent: 'flex-start',
         alignItems: 'center',
         marginVertical: spacing.s,
      },
      containerTop: {
         width: '90%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginBottom: spacing.s,
      },
      bottom: {
         width: '100%',
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
         marginTop: spacing.xs,
      },
   });
};

export default ComponentStyle;
