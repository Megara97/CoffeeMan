import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CustomButton from '../atoms/CustomButton/CustomButton';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const BottomCommand = ({navigation, id, numberProducts, subtotal}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   return (
      <Shadow {...styles.shadow}>
         <View style={styles.container}>
            <View style={styles.subtotal}>
               <Text style={styles.title}> Productos ({numberProducts}) </Text>
               <Text style={styles.title}>
                  {subtotal !== undefined || null
                     ? `$ ${subtotal.toFixed(2)}`
                     : null}
               </Text>
            </View>
            <View style={styles.buttons}>
               <TouchableOpacity
                  onPress={() => navigation.navigate('Products', {id: id})}>
                  <CustomButton type={1} />
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => navigation.navigate('Pay', {id: id})}>
                  <CustomButton type={2} />
               </TouchableOpacity>
            </View>
         </View>
      </Shadow>
   );
};
//$ {subtotal.toFixed(2)}

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '100%',
         flex: 1,
         //height: 130,
         backgroundColor: colors.secondary,
         flexDirection: 'columns',
         justifyContent: 'flex-end',
         alignItems: 'center',
         paddingTop: spacing.s,
         borderTopStartRadius: radius.l,
         borderTopRightRadius: radius.l,
      },
      subtotal: {
         width: '70%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      buttons: {
         width: '70%',
         marginTop: spacing.xs,
         marginBottom: spacing.l,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      title: {
         ...typography.titleBold,
         color: colors.typography,
      },
      shadow: {
         distance: spacing.s,
         ...colors.shadow,
         style: {
            flexDirection: 'row',
         },
      },
   });
};

export default BottomCommand;
