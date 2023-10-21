import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Modal,
   Switch,
   useColorScheme,
} from 'react-native';
//import colors from '../../assets/colors';
import Logo from '../atoms/Logo';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const SideMenu = ({
   navigation,
   modalVisible,
   setModalVisible,

   setChange,
}) => {
   const colors = useTheme().colors;
   const styles = StyleSheet.create({
      containerTotal: {
         backgroundColor: colors.typography + '70',
         width: '100%',
         height: '100%',
      },
      side: {
         position: 'absolute',
         top: 50,
         width: '60%',
         height: '100%',
         backgroundColor: colors.color,
         flexDirection: 'column',
         justifyContent: 'space-between',
      },
      logo: {
         width: '30%', //'50%',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      sections: {
         width: '100%',

         flexDirection: 'column',
         alignItems: 'flex-end',
         justifyContent: 'flex-start',
         paddingTop: 30,
         paddingHorizontal: 10,
      },
      aparience: {
         width: '100%',
         height: '30%',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'flex-start',
         paddingVertical: 20,
         borderTopWidth: 1,
         borderColor: colors.gray1,
      },
      switch: {
         width: '100%',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
      },
      title: {
         color: colors.background,
         fontSize: 15,
         fontFamily: 'Imprima-Regular',
         textAlign: 'left',
         paddingVertical: 7,
      },
      circle: {
         width: 70,
         height: 70,
         borderRadius: 35,
         backgroundColor: colors.gray1,
         alignItems: 'center',
         justifyContent: 'center',
      },
      image: {
         width: 50,
         height: 50,
      },
   });

   const [systemMode, setSystemMode] = useState(true);
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         const storageSystemMode = await AsyncStorage.getItem(
            'systemColorScheme',
         );
         setSystemMode(JSON.parse(storageSystemMode));
         if (storageSystemMode !== null) {
            setSystemMode(true);
         }
         const storageDarkScheme = await AsyncStorage.getItem('darkScheme');
         setDarkMode(JSON.parse(storageDarkScheme));
         if (storageDarkScheme !== null) {
            setDarkMode(false);
         }
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
         <View style={styles.containerTotal}>
            <View style={styles.side}>
               <View style={styles.sections}>
                  <TouchableOpacity
                     onPress={() => {
                        setModalVisible(false);
                        navigation.navigate('Commands');
                     }}>
                     <Text style={styles.title}>
                        {' '}
                        Administración de comandas{' '}
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={() => {
                        setModalVisible(false);
                        navigation.navigate('Menu');
                     }}>
                     <Text style={styles.title}> Configuración del menú </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={() => {
                        setModalVisible(false);
                        navigation.navigate('Reports');
                     }}>
                     <Text style={styles.title}> Reportes </Text>
                  </TouchableOpacity>
               </View>
               <View style={styles.aparience}>
                  <Text style={styles.title}>Modo oscuro</Text>
                  <Text style={[styles.title, {fontSize: 13}]}>
                     Usar configuración del sistema
                  </Text>
                  <Switch
                     value={systemMode}
                     onValueChange={() => onSave('system')}
                  />
                  {!systemMode && (
                     <View style={styles.switch}>
                        <Text style={[styles.title, {fontSize: 13}]}>
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

//onValueChange={setSystemMode}
//onValueChange={setDarkMode}
export default SideMenu;
