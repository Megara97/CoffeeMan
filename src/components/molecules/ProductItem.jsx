import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const Item = ({id, product, price, setId, setVisible}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const callInfoProduct = () => {
      setVisible(true);
      setId(id);
   };

   return (
      <TouchableOpacity onPress={callInfoProduct}>
         <Shadow {...styles.shadow}>
            <View style={styles.item}>
               <Text style={styles.product}> {product} </Text>
               <Text style={styles.price}>
                  $ {parseFloat(price).toFixed(2)}
               </Text>
            </View>
         </Shadow>
      </TouchableOpacity>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      item: {
         width: 100,
         height: 90,
         borderRadius: radius.s,
         backgroundColor: colors.secondary,
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         padding: spacing.s,
         margin: spacing.xs,
      },
      product: {
         ...typography.title,
         textAlign: 'center',
         lineHeight: spacing.l,
         paddingTop: spacing.xs,
         color: colors.typography,
      },
      price: {
         ...typography.body,
         color: colors.overlay,
      },
      shadow: {
         distance: spacing.xxs,
         ...colors.shadow,
         offset: [8, 8],
      },
   });
};

export default Item;
