import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const Item = ({number, product, subtotal}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const total = number * subtotal;
   return (
      <View style={styles.item}>
         <Text style={[styles.text, {width: '10%'}]}> {number} </Text>
         <Text style={[styles.text, {width: '50%'}]}> {product} </Text>
         <Text style={styles.textlight}> $ {subtotal.toFixed(2)} </Text>
         <Text style={[styles.text, {width: '20%', textAlign: 'right'}]}>
            $ {total.toFixed(2)}
         </Text>
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      item: {
         width: '100%',
         height: 40,
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         paddingHorizontal: spacing.m,
         borderBottomColor: colors.surface,
         borderBottomWidth: 1,
      },
      text: {
         ...typography.body,
         color: colors.typography,
      },
      textlight: {
         width: '20%',
         textAlign: 'right',
         ...typography.body,
         color: colors.overlay,
      },
   });
};

export default Item;
