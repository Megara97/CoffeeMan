import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import colors from '../../assets/colors';
import {Shadow} from 'react-native-shadow-2';
import {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import CustomMiniButton from '../atoms/CustomMiniButton';

const Item = ({id, product, price, number, addItem, substractItem}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [quantity, setQuantity] = useState(0);

   useEffect(() => {
      if (number) {
         setQuantity(number);
      }
   }, [number]);

   const addProduct = () => {
      setQuantity(quantity + 1);
      addItem(id);
   };

   const substractProduct = () => {
      setQuantity(quantity - 1);
      substractItem(id);
   };

   return (
      <View style={[styles.container]}>
         <TouchableOpacity onPress={() => addProduct()}>
            <Shadow {...styles.shadow}>
               <View style={[styles.item, quantity > 0 && styles.selectedItem]}>
                  <Text style={styles.product}> {product} </Text>
                  <Text style={styles.price}>
                     $ {parseFloat(price).toFixed(2)}
                  </Text>
                  <Text style={styles.quantity}> {quantity} </Text>
               </View>
            </Shadow>
         </TouchableOpacity>
         {quantity > 0 && (
            <TouchableOpacity onPress={() => substractProduct()}>
               <View style={[styles.less]}>
                  <CustomMiniButton type={3} />
               </View>
            </TouchableOpacity>
         )}
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: 105,
         height: 110,
         margin: spacing.xs,
      },
      item: {
         width: 100,
         height: 105,
         borderRadius: radius.s,
         backgroundColor: colors.secondary,
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingVertical: spacing.s,
         //margin: spacing.xs,
      },
      selectedItem: {
         width: 100,
         height: 105,
         borderRadius: radius.s,
         backgroundColor: colors.surface,
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingVertical: spacing.s,
         //margin: spacing.xs,
      },
      less: {
         position: 'absolute',
         bottom: -5,
         right: -5,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
      },
      product: {
         height: 40,
         ...typography.body,
         textAlign: 'center',
         textAlignVertical: 'center',
         lineHeight: spacing.l,
         paddingTop: spacing.xs,
         color: colors.typography,
      },
      quantity: {
         ...typography.body,
         textAlign: 'center',
         color: colors.color1,
      },
      price: {
         ...typography.body,
         color: colors.overlay,
      },
      shadow: {
         distance: spacing.xxs,
         ...colors.shadow,
         offset: [3, 3],
      },
   });
};

export default Item;
