import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const Item = ({navigation, client, subtotal, id}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const putName = () => (title = client === '' ? 'Comanda ' + id : client);

   return (
      <TouchableOpacity
         onPress={() => navigation.navigate('CommandDetails', {id: id})}>
         <Shadow {...styles.shadow}>
            <View style={styles.item}>
               <Text style={styles.title}> {putName()} </Text>
               <Text style={styles.subtotal}>
                  {subtotal !== undefined
                     ? `Subtotal: $ ${subtotal.toFixed(2)}`
                     : null}
               </Text>
            </View>
         </Shadow>
      </TouchableOpacity>
   );
};
// Subtotal: $ {subtotal.toFixed(2)}

const ComponentStyle = colors => {
   return StyleSheet.create({
      item: {
         width: '100%',
         height: 50,
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         backgroundColor: colors.secondary,
         paddingHorizontal: spacing.l,
         marginVertical: spacing.xs,
         borderRadius: radius.s,
      },
      title: {
         width: '60%',
         ...typography.title,
         color: colors.typography,
      },
      subtotal: {
         width: '40%',
         textAlign: 'right',
         ...typography.body,
         color: colors.overlay,
      },
      shadow: {
         distance: spacing.xxs,
         ...colors.shadow,
         offset: [5, 8],
      },
   });
};

export default Item;
