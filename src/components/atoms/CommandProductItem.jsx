import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import colors from '../../assets/colors';
import {Shadow} from 'react-native-shadow-2';
import {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import Less from '../../assets/icons/less.svg';

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
                  <Text style={styles.product}>{product}</Text>
                  <Text style={styles.price}>
                     $ {parseFloat(price).toFixed(2)}
                  </Text>
                  <Text style={styles.quantity}> {quantity} </Text>
               </View>
            </Shadow>
         </TouchableOpacity>
         {quantity > 0 && (
            <TouchableOpacity onPress={() => substractProduct()}>
               <View style={styles.less}>
                  <Less width={15} height={15} fill={colors.background} />
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
         padding: spacing.s,
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
         width: 25,
         height: 25,
         borderRadius: radius.s,
         backgroundColor: colors.color1,
      },
      product: {
         height: 40,
         ...typography.title,
         textAlign: 'center',
         textAlignVertical: 'top',
         lineHeight: spacing.l,
         paddingTop: spacing.xxs,
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
