import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Modal,
   Switch,
} from 'react-native';
import Logo from '../atoms/Logo';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {typography, spacing, radius} from '../../styles/index';

const SideMenu = ({navigation, modalVisible, setModalVisible, setChange}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [systemMode, setSystemMode] = useState(true);
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         const storageSystemMode = await AsyncStorage.getItem(
            'systemColorScheme',
         );
         setSystemMode(
            storageSystemMode !== null ? JSON.parse(storageSystemMode) : true,
         );
         //console.log('system', JSON.parse(storageSystemMode));
         /*setSystemMode(JSON.parse(storageSystemMode));
         if (storageSystemMode === null) {
            setSystemMode(true);
         }*/
         const storageDarkScheme = await AsyncStorage.getItem('darkScheme');
         setDarkMode(
            storageDarkScheme !== null ? JSON.parse(storageDarkScheme) : false,
         );
         //console.log('dark', JSON.parse(storageDarkScheme));
         /*setDarkMode(JSON.parse(storageDarkScheme));
         if (storageDarkScheme === null) {
            setDarkMode(false);
         }*/
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

   return (
      <Modal
         animationType="none"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => {
            setModalVisible(!modalVisible);
         }}>
         <View style={styles.backdrop}>
            <View style={styles.side}>
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
                        navigation.navigate('Reports');
                     }}>
                     <Text style={styles.titleHeader}>Reportes</Text>
                  </TouchableOpacity>
               </View>
               <View style={styles.aparience}>
                  <Text style={styles.title}>Modo oscuro</Text>
                  <Text style={[styles.body]}>
                     Usar configuración del sistema
                  </Text>
                  <Switch
                     value={systemMode}
                     onValueChange={() => onSave('system')}
                  />
                  {!systemMode && (
                     <View style={styles.switch}>
                        <Text style={[styles.body]}>
                           {darkMode ? 'Activado' : 'Desactivado'}
                        </Text>
                        <Switch
                           value={darkMode}
                           onValueChange={() => onSave('custom')}
                           disabled={systemMode}
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
      </Modal>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      backdrop: {
         width: '100%',
         height: '100%',
         backgroundColor: colors.typography + '70',
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'flex-start',
      },
      side: {
         position: 'absolute',
         top: 55,
         width: '70%',
         height: '100%',
         backgroundColor: colors.color1,
         flexDirection: 'column',
         justifyContent: 'space-between',
      },
      logo: {
         width: '30%',
         flexDirection: 'row',
         justifyContent: 'center',
      },
      sections: {
         width: '100%',
         height: '70%',
         flexDirection: 'column',
         justifyContent: 'flex-start',
         alignItems: 'flex-end',
         paddingVertical: spacing.xl,
         paddingHorizontal: spacing.m,
      },
      aparience: {
         width: '100%',
         height: '30%',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'flex-start',
         paddingVertical: spacing.l,
         borderTopWidth: 1,
         borderColor: colors.surface,
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
