import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const Item = ({number, product, subtotal}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const calcTotal = () => {
      let total = number * subtotal;
      total = total.toFixed(2);
      return total;
   };

   return (
      <View style={styles.item}>
         <Text style={[styles.text, {width: '10%'}]}> {number} </Text>
         <Text style={[styles.text, {width: '35%'}]}> {product} </Text>
         <Text style={styles.textlight}> $ {subtotal.toFixed(2)} </Text>
         <Text style={[styles.text, {width: '28%', textAlign: 'right'}]}>
            $ {calcTotal()}
         </Text>
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      item: {
         width: '100%',
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingVertical: spacing.s,
         paddingHorizontal: spacing.m,
         borderBottomColor: colors.surface,
         borderBottomWidth: 1,
      },
      text: {
         ...typography.body,
         color: colors.typography,
         textAlignVertical: 'center',
         paddingTop: spacing.s,
         lineHeight: spacing.l,
         //borderWidth: 1,
      },
      textlight: {
         width: '27%', //20,27
         textAlign: 'right',
         ...typography.body,
         color: colors.overlay,
         //borderWidth: 1,
      },
   });
};

export default Item;
