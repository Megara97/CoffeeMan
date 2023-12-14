import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Modal,
   Switch,
   ScrollView,
} from 'react-native';
import Logo from '../atoms/Logo';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {typography, spacing, radius} from '../../styles/index';
import {useLocalStorage} from '../../customHooks/useLocalStorage';

const SideMenu = ({
   navigation,
   modalVisible,
   setModalVisible,
   setChange,
   change,
}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [systemMode, setSystemMode] = useLocalStorage(
      'systemColorScheme',
      true,
      change,
   );
   const [darkMode, setDarkMode] = useLocalStorage('darkScheme', false, change);

   /* const [systemMode, setSystemMode] = useState(true);
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         const storageSystemMode = await AsyncStorage.getItem(
            'systemColorScheme',
         );
         setSystemMode(
            storageSystemMode !== null ? JSON.parse(storageSystemMode) : true,
         );
         const storageDarkScheme = await AsyncStorage.getItem('darkScheme');
         setDarkMode(
            storageDarkScheme !== null ? JSON.parse(storageDarkScheme) : false,
         );

      };
      fetchData();
   }, []);

   const onSave = async type => {
      try {
         if (type === 'system') {
            await AsyncStorage.setItem(
               'systemColorScheme',
               JSON.stringify(!systemMode),
            );
            setSystemMode(!systemMode);
         } else if (type === 'custom') {
            await AsyncStorage.setItem('darkScheme', JSON.stringify(!darkMode));
            setDarkMode(!darkMode);
         }
      } catch (e) {
         console.error(e);
      }
      setChange('Edit' + systemMode + darkMode);
   };
*/

   return (
      <Modal
         animationType="none"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => {
            setModalVisible(!modalVisible);
         }}>
         <View style={styles.backdrop}>
            <View style={styles.modal}>
               <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.header}
               />
               <View style={styles.side}>
                  <ScrollView>
                     <View style={styles.sections}>
                        <TouchableOpacity
                           onPress={() => {
                              setModalVisible(false);
                              navigation.navigate('Commands');
                           }}>
                           <Text style={styles.titleHeader}>
                              Administración de comandas
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           onPress={() => {
                              setModalVisible(false);
                              navigation.navigate('Menu');
                           }}>
                           <Text style={styles.titleHeader}>
                              Configuración del menú
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           onPress={() => {
                              setModalVisible(false);
                              navigation.navigate('Costs');
                           }}>
                           <Text style={styles.titleHeader}>
                              Gastos de operación
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           onPress={() => {
                              setModalVisible(false);
                              navigation.navigate('Reports');
                           }}>
                           <Text style={styles.titleHeader}>Reportes</Text>
                        </TouchableOpacity>
                     </View>
                  </ScrollView>
                  <View style={styles.aparience}>
                     <Text style={styles.title}>Modo oscuro</Text>
                     <Text style={[styles.body]}>
                        Usar configuración del sistema
                     </Text>
                     <Switch
                        value={systemMode}
                        onValueChange={() => {
                           setSystemMode(!systemMode);
                           setChange('Edit' + systemMode + darkMode);
                        }}
                        trackColor={{true: colors.overlay}}
                     />
                     {!systemMode && (
                        <View style={styles.switch}>
                           <Text style={[styles.body]}>
                              {darkMode ? 'Activado' : 'Desactivado'}
                           </Text>
                           <Switch
                              value={darkMode}
                              onValueChange={() => {
                                 setDarkMode(!darkMode);
                                 setChange('Edit' + systemMode + darkMode);
                              }}
                              disabled={systemMode}
                              trackColor={{true: colors.overlay}}
                           />
                        </View>
                     )}
                  </View>
               </View>
               <View style={styles.logo}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                     <Logo navigation={navigation} menu={true} />
                  </TouchableOpacity>
               </View>
            </View>
            <TouchableOpacity
               onPress={() => setModalVisible(false)}
               style={styles.skip}
            />
         </View>
      </Modal>
   );
};
//onValueChange={() => onSave('system')}
//onValueChange={() => onSave('custom')}

const ComponentStyle = colors => {
   return StyleSheet.create({
      backdrop: {
         height: '100%',
         width: '100%',
         backgroundColor: colors.typography + '70',
         flexDirection: 'row',
         justifyContent: 'space-between',
      },
      modal: {
         height: '100%',
         //width: '70%',
         width: 270,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'flex-start',
      },
      skip: {
         height: '100%',
         width: '30%',
      },
      header: {
         width: '100%',
         height: 55,
      },
      side: {
         flex: 1,
         width: '100%',
         backgroundColor: colors.color1,
         flexDirection: 'column',
         justifyContent: 'space-between',
      },
      logo: {
         position: 'absolute',
         top: 0,
         //width: '30%',
         width: 120,
         alignItems: 'center',
      },
      sections: {
         width: '100%',
         flexDirection: 'column',
         justifyContent: 'flex-start',
         alignItems: 'flex-end',
         paddingVertical: spacing.m,
         paddingHorizontal: spacing.m,
      },
      aparience: {
         width: '100%',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'flex-end',
         paddingVertical: spacing.s,
         borderTopWidth: 1,
         borderColor: colors.surface,
      },
      scroll: {
         height: 150,
         width: '100%',
      },
      switch: {
         width: '50%',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
      },
      titleHeader: {
         color: colors.background,
         ...typography.header,
         textAlign: 'left',
         paddingVertical: spacing.s,
      },
      title: {
         color: colors.background,
         ...typography.title,
         paddingBottom: spacing.s,
      },
      body: {
         color: colors.background,
         ...typography.body,
      },
   });
};

export default SideMenu;
