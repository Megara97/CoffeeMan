import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const Item = ({navigation, client, subtotal, id, date, paid = false}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const formatDateTime = moment => {
      const date = new Date(moment);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
   };

   const putName = () => {
      let title = client === '' ? 'Comanda ' + id : client;
      if (paid) {
         title = formatDateTime(date);
      }
      return title;
   };

   const itemPress = () => {
      if (paid) {
         navigation.navigate('PayDetails', {id: id});
      } else {
         navigation.navigate('CommandDetails', {id: id});
      }
   };

   return (
      <TouchableOpacity onPress={() => itemPress()}>
         <Shadow {...styles.shadow}>
            <View style={styles.item}>
               <Text style={styles.title}> {putName()} </Text>
               <Text style={styles.subtotal}>
                  {subtotal !== undefined || null
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
