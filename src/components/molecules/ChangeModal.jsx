import React, {useEffect, useState} from 'react';
import {
   Modal,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native';
import CustomButton from '../atoms/CustomButton/CustomButton';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const ChangeModal = ({id, total, visible, setVisible}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [money, setMoney] = useState('');
   useEffect(() => {
      setMoney('');
   }, [total]);

   const closeModals = () => {
      setVisible(!visible);
   };

   const calcChange = () => {
      let change = money - total;
      change = change.toFixed(2);
      if (money <= 0) {
         change = '       -';
      }
      return change;
   };

   const calcMoney = text => {
      let number = parseFloat(text);
      if (!isNaN(number)) {
         number = number.toFixed(2);
         setMoney(number);
      } else {
         setMoney('');
      }
   };

   return (
      <Modal
         animationType="slide"
         transparent={true}
         visible={visible}
         onRequestClose={() => {
            setVisible(!visible);
         }}>
         <View style={styles.backdrop}>
            <View style={styles.container}>
               <View style={styles.changeMenu}>
                  <View style={styles.productsMenu}>
                     <Text style={styles.bold}>Total</Text>
                     <Text style={styles.bold}>$ {total} </Text>
                  </View>
                  <View style={styles.productsMenu}>
                     <Text style={styles.content}>Recibido:</Text>
                     <View style={styles.inputContainer}>
                        <Text style={styles.content}>$</Text>
                        <TextInput
                           style={styles.input}
                           onEndEditing={e => calcMoney(e.nativeEvent.text)}
                           //onChangeText={setMoney}
                           //value={money}
                           placeholder={money}
                           placeholderTextColor={colors.overlay}
                           keyboardType="numeric"
                        />
                     </View>
                  </View>
                  <View style={styles.productsMenu}>
                     <Text style={styles.content}>Cambio:</Text>
                     <Text style={styles.content}>$ {calcChange()} </Text>
                  </View>
               </View>
               <View style={styles.buttons}>
                  <TouchableOpacity onPress={closeModals}>
                     <CustomButton type={7} />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      backdrop: {
         width: '100%',
         height: '100%',
         backgroundColor: colors.typography + '70',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
      },
      container: {
         //width: '80%',
         width: 310,
         height: 200,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: colors.secondary,
         borderRadius: radius.s,
      },
      changeMenu: {
         width: '60%',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
      },
      productsMenu: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      inputContainer: {
         paddingLeft: spacing.xs,
         backgroundColor: colors.background,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      buttons: {
         width: '50%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         marginVertical: spacing.s,
      },
      bold: {
         ...typography.titleBold,
      },
      content: {
         ...typography.title,
         color: colors.typography,
      },
      input: {
         paddingVertical: 0,
         textAlign: 'right',
         ...typography.title,
         color: colors.typography,
      },
   });
};

export default ChangeModal;
