import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import colors from '../../assets/colors';
import {Shadow} from 'react-native-shadow-2';
import {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const Item = ({
   id,
   product,
   price,
   isSelected = false,
   toggleSelection,
   setId,
   setVisible,
   selectable = false,
}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const itemPress = () => {
      if (selectable) {
         toggleSelection(id);
      } else {
         setVisible(true);
         setId(id);
      }
   };

   return (
      <TouchableOpacity onPress={() => itemPress()}>
         <Shadow {...styles.shadow}>
            <View style={[styles.item, isSelected && styles.selectedItem]}>
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
         height: 85,
         borderRadius: radius.s,
         backgroundColor: colors.secondary,
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingVertical: spacing.s,
         margin: spacing.xs,
      },
      selectedItem: {
         width: 100,
         height: 85,
         borderRadius: radius.s,
         backgroundColor: colors.surface,
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingVertical: spacing.s,
         margin: spacing.xs,
      },
      product: {
         ...typography.body,
         textAlign: 'center',
         lineHeight: spacing.l,
         //paddingTop: spacing.xxs,
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
