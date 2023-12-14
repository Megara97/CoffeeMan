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
import {usePartLocalStorage} from '../../customHooks/usePartLocalStorage';
import ButtonGroup from '../molecules/ButtonGroup';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

const InfoCost = ({
   type,
   list,
   setList,
   id,
   setChange,
   visible,
   setVisible,
   setDeleteVisible,
}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [amount, setAmount] = useState('');
   const [method, setMethod] = useState(0);
   const [selectedCategory, setSelectedCategory] = useState('1');
   const [details, setDetails] = useState('');
   const [cost, deleteCost, changeCost] = usePartLocalStorage('costs', id);
   const {dark} = useTheme();
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   const [date, setDate] = useState(today);
   const [open, setOpen] = useState(false);

   const data = [
      {value: '1', label: 'Insumos'},
      {value: '2', label: 'Servicios'},
      {value: '3', label: 'Renta'},
      {value: '4', label: 'Salario'},
      {value: '5', label: 'Otros'},
   ];

   const formatDateTime = selectedDate => {
      const date = new Date(selectedDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
   };

   useEffect(() => {
      if (cost) {
         if (type === 'new') {
            cleanEntry();
         } else {
            setAmount(cost.amount.toString());
            setMethod(cost.source === 'efectivo' ? 0 : 1);
            setSelectedCategory(
               data.find(item => item.label === cost.category).value,
            );
            setDetails(cost.details);
            const dateCost = new Date(cost.date);
            setDate(dateCost);
         }
      }
   }, [cost, type]);

   const cleanEntry = () => {
      setAmount('');
      setMethod(0);
      setSelectedCategory('1');
      setDetails('');
      setDate(today);
   };

   const recordCostChanges = () => {
      money = parseFloat(amount);
      if (type === 'new') {
         if (!isNaN(money)) {
            let lastId = 1;
            if (list.length !== 0) {
               lastId = list[list.length - 1].id + 1;
            }
            money = parseFloat(amount);
            if (isNaN(money)) {
               money = 0;
            }
            const newElement = {
               id: lastId,
               amount: money,
               source: method === 0 ? 'efectivo' : 'tarjeta',
               category: data.find(item => item.value === selectedCategory)
                  .label,
               details: details,
               date: date,
            };
            let newValue = list.slice();
            newValue.push(newElement);
            //console.log(newValue);
            setList(newValue);
            setVisible(!visible);
            cleanEntry();
         } else {
            Alert.alert('', 'Falta determinar el monto del nuevo gasto', [
               {text: 'OK'},
            ]);
         }
      } else {
         if (!isNaN(money)) {
            if (cost) {
               let newValue = {...cost};
               newValue.amount = money;
               newValue.source = method === 0 ? 'efectivo' : 'tarjeta';
               newValue.category = data.find(
                  item => item.value === selectedCategory,
               ).label;
               newValue.details = details;
               //console.log(newValue);
               changeCost(newValue);
            }
         }
         setVisible(!visible);
         setChange('Edit' + amount + selectedCategory);
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
               <View style={styles.info}>
                  <View style={styles.entry}>
                     <Text style={styles.text}>Monto $ </Text>
                     <TextInput
                        style={styles.inputPrice}
                        onChangeText={setAmount}
                        value={amount}
                        keyboardType="numeric"
                        maxLength={7}
                     />
                  </View>

                  <ButtonGroup
                     style={styles.text}
                     title="Modo de pago"
                     buttons={[{type: 1}, {type: 2}]}
                     selectedOption={method}
                     onSelect={setMethod}
                  />
                  <View style={styles.spinnerContainer}>
                     <Text style={styles.text}>{'      '}Categoria </Text>
                     <Picker
                        style={styles.spinner}
                        mode="dropdown"
                        dropdownIconColor={colors.typography}
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue, itemIndex) =>
                           setSelectedCategory(itemValue)
                        }>
                        {data.map((item, index) => (
                           <Picker.Item
                              label={item.label}
                              value={item.value}
                              key={item.value}
                              index={index}
                              style={styles.item}
                           />
                        ))}
                     </Picker>
                  </View>
                  <View style={styles.entry}>
                     <TextInput
                        style={styles.input}
                        onChangeText={setDetails}
                        value={details}
                        placeholder={'Detalles'}
                        placeholderTextColor={colors.overlay}
                        multiline
                     />
                  </View>
                  <View style={styles.entry}>
                     <Text style={styles.text}>Fecha </Text>
                     {type === 'new' ? (
                        <>
                           <TouchableOpacity
                              style={styles.date}
                              onPress={() => setOpen(true)}>
                              <Text style={styles.text}>
                                 {formatDateTime(date)}
                              </Text>
                           </TouchableOpacity>
                           <DatePicker
                              modal
                              mode="date"
                              locale={'es'}
                              open={open}
                              date={date}
                              title="Seleccionar fecha"
                              confirmText="Confirmar"
                              cancelText="Cancelar"
                              theme={dark ? 'dark' : 'light'}
                              onConfirm={date => {
                                 setOpen(false);
                                 setDate(date);
                              }}
                              onCancel={() => {
                                 setOpen(false);
                              }}
                              maximumDate={today}
                           />
                        </>
                     ) : (
                        <Text style={styles.text}>
                           {'  '}
                           {formatDateTime(date)}
                        </Text>
                     )}
                  </View>
               </View>

               <View
                  style={{
                     ...styles.buttons,
                     justifyContent:
                        type !== 'new' ? 'space-between' : 'center',
                  }}>
                  <TouchableOpacity onPress={recordCostChanges}>
                     <CustomButton type={3} />
                  </TouchableOpacity>
                  {type != 'new' && (
                     <TouchableOpacity onPress={() => setDeleteVisible(true)}>
                        <CustomButton type={4} />
                     </TouchableOpacity>
                  )}
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
         justifyContent: 'flex-end',
         alignItems: 'center',
      },
      container: {
         width: '100%',
         height: 360,
         //flex: 1,
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
         paddingTop: spacing.s,
         backgroundColor: colors.secondary,
         borderTopLeftRadius: radius.l,
         borderTopRightRadius: radius.l,
      },
      info: {
         width: '100%',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
      },
      entry: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         marginVertical: spacing.xs,
      },
      buttons: {
         width: '40%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         marginBottom: spacing.l,
         marginTop: spacing.m,
      },
      inputPrice: {
         width: 80, //'15%',
         paddingHorizontal: spacing.xs,
         backgroundColor: colors.background,
         paddingVertical: 0,
         textAlign: 'center',
         ...typography.title,
         color: colors.typography,
      },
      input: {
         width: '50%',
         height: 70,
         paddingVertical: 0,
         lineHeight: spacing.l,
         paddingTop: spacing.s,
         paddingHorizontal: spacing.s,
         backgroundColor: colors.background,
         color: colors.typography,
         ...typography.title,
         textAlignVertical: 'top',
         textAlign: 'center',
      },
      textName: {
         color: colors.typography,
         ...typography.titleBold,
         paddingBottom: spacing.xs,
      },
      text: {
         color: colors.typography,
         ...typography.title,
      },
      spinnerContainer: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      spinner: {
         //width: '35%',
         width: 130,
      },
      item: {
         backgroundColor: colors.secondary,
         color: colors.typography,
         fontSize: 14,
         //...typography.body, //no detecta fontFamily, solo size
         //paddingVertical: 0,
      },
      date: {
         //width: '25%',
         width: 100,
         backgroundColor: colors.background,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
   });
};

export default InfoCost;
