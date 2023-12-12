import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../atoms/CustomButton/CustomButton';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const DeletePaidCommands = ({
   selectedPeriod,
   visible,
   setVisible,
   setResponse,
}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const closeModals = response => {
      setResponse(response);
      setVisible(!visible);
   };

   const formatDateTime = moment => {
      const date = new Date(moment);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
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
                  ¿Estas seguro de eliminar los registros de
                  <Text style={styles.bold}>
                     {' '}
                     {formatDateTime(selectedPeriod[0])} {'al '}
                     {formatDateTime(selectedPeriod[1])}
                  </Text>
                  ?
               </Text>
               <View style={styles.buttons}>
                  <TouchableOpacity onPress={() => closeModals(false)}>
                     <CustomButton type={6} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => closeModals(true)}>
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

export default DeletePaidCommands;
