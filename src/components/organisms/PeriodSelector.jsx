import {
   Button,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   ViewComponent,
} from 'react-native';
import {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {typography, spacing, radius} from '../../styles/index';
import {useTheme} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

const PeriodSelector = ({setSelection}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);
   const [selectedPeriod, setSelectedPeriod] = useState('1');
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   const [date1, setDate1] = useState(today);
   const [open1, setOpen1] = useState(false);
   const [date2, setDate2] = useState(today);
   const [open2, setOpen2] = useState(false);
   const {dark} = useTheme();

   const data = [
      {value: '1', label: 'Hoy'},
      {value: '2', label: 'Ayer'},
      {value: '3', label: 'Mes actual'},
      {value: '4', label: 'Mes anterior'},
      {value: '5', label: 'Personalizado'},
   ];

   const formatDateTime = selectedDate => {
      const date = new Date(selectedDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
   };

   useEffect(() => {
      switch (selectedPeriod) {
         case '1':
            const last = new Date(today);
            last.setHours(23, 59, 59, 999);
            setSelection([today, last]);
            break;
         case '2':
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const yesterdayLast = new Date(yesterday);
            yesterdayLast.setHours(23, 59, 59, 999);
            setSelection([yesterday, yesterdayLast]);
            break;
         case '3':
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1); // Primer día del mes
            const lastDay = new Date(
               today.getFullYear(),
               today.getMonth() + 1,
               0,
               23,
               59,
               59,
               999,
            );
            setSelection([firstDay, lastDay]);
            break;
         case '4':
            //const today = new Date('2024-3-07');
            const firstDayPast = new Date(
               today.getFullYear(),
               today.getMonth() - 1,
               1,
            );
            const lastDayPast = new Date(
               today.getFullYear(),
               today.getMonth(),
               0,
               23,
               59,
               59,
               999,
            );
            setSelection([firstDayPast, lastDayPast]);
            break;
         case '5':
            setDate1(today);
            setDate2(today);
            setOpen1(true);
            break;
         default:
            break;
      }
   }, [selectedPeriod]);

   useEffect(() => {
      const last = new Date(date2);
      last.setHours(23, 59, 59, 999);
      setSelection([date1, last]);
   }, [date1, date2]);

   return (
      <View style={styles.container}>
         <View style={styles.spinnerContainer}>
            <Text style={styles.title}>Periodo:</Text>
            <Picker
               style={styles.spinner}
               mode="dropdown"
               dropdownIconColor={colors.typography}
               selectedValue={selectedPeriod}
               onValueChange={(itemValue, itemIndex) =>
                  setSelectedPeriod(itemValue)
               }>
               {data.map((item, index) => (
                  <Picker.Item
                     label={item.label}
                     value={item.value}
                     key={item.value} //{index}
                     index={index}
                     style={styles.item}
                  />
               ))}
            </Picker>
         </View>
         <>
            {selectedPeriod === '5' && (
               <View style={styles.dates}>
                  <TouchableOpacity
                     style={styles.date}
                     onPress={() => setOpen1(true)}>
                     <Text style={styles.content}>
                        {formatDateTime(date1)}{' '}
                     </Text>
                  </TouchableOpacity>
                  <Text style={styles.content}> - </Text>
                  <TouchableOpacity
                     style={styles.date}
                     onPress={() => setOpen2(true)}>
                     <Text style={styles.content}>
                        {' '}
                        {formatDateTime(date2)}
                     </Text>
                  </TouchableOpacity>
                  <DatePicker
                     modal
                     mode="date"
                     locale={'es'}
                     open={open1}
                     date={date1}
                     title="Seleccionar fecha inicial"
                     confirmText="Confirmar"
                     cancelText="Cancelar"
                     theme={dark ? 'dark' : 'light'}
                     onConfirm={date => {
                        setOpen1(false);
                        setDate1(date);
                        setOpen2(true);
                     }}
                     onCancel={() => {
                        setOpen1(false);
                     }}
                     maximumDate={date2}
                  />
                  <DatePicker
                     modal
                     mode="date"
                     locale={'es'}
                     open={open2}
                     date={date2}
                     title="Seleccionar fecha final"
                     confirmText="Confirmar"
                     cancelText="Cancelar"
                     theme={dark ? 'dark' : 'light'}
                     onConfirm={date => {
                        setOpen2(false);
                        setDate2(date);
                     }}
                     onCancel={() => {
                        setOpen2(false);
                     }}
                     maximumDate={today}
                     minimumDate={date1}
                  />
               </View>
            )}
         </>
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '90%',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors.secondary,
         borderRadius: radius.s,
      },
      spinnerContainer: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      dates: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         paddingBottom: spacing.s,
      },
      spinner: {
         width: '50%',
         //height: 50,
         //paddingVertical: 0,
         //color: colors.typography,
         //backgroundColor: colors.secondary,
      },
      item: {
         backgroundColor: colors.secondary,
         color: colors.typography,
         fontSize: 14,
         //...typography.body, //no detecta fontFamily, solo size
         //paddingVertical: 0,
      },
      content: {
         ...typography.body,
         color: colors.typography,
      },
      title: {
         ...typography.title,
         color: colors.typography,
      },
      date: {
         width: '25%',
         backgroundColor: colors.background,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
   });
};

export default PeriodSelector;
