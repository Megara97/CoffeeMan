import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../atoms/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';
import {usePartLocalStorage} from '../../customHooks/usePartLocalStorage';

const DeleteCost = ({id, setChange, visible, setVisible, setInfoVisible}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [cost, deleteCost, changeCost] = usePartLocalStorage('costs', id);

   const closeModals = () => {
      setVisible(!visible);
      setInfoVisible(!visible);
   };

   const recordDeletedCost = () => {
      deleteCost();
      closeModals();
      setChange('Delete' + id);
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
               <Text style={styles.message}>
                  ¿Estas seguro de eliminar este registro?
               </Text>
               <View style={styles.buttons}>
                  <TouchableOpacity onPress={closeModals}>
                     <CustomButton type={6} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={recordDeletedCost}>
                     <CustomButton type={5} />
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
         width: '80%',
         height: 170,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: colors.secondary,
         borderRadius: radius.s,
      },
      message: {
         textAlign: 'center',
         color: colors.typography,
         marginVertical: spacing.s,
         paddingHorizontal: spacing.l,
         ...typography.title,
      },
      bold: {
         ...typography.titleBold,
      },
      buttons: {
         width: '50%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginVertical: spacing.s,
      },
   });
};

export default DeleteCost;
