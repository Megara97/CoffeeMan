import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   useColorScheme,
   Modal,
} from 'react-native';
//import colors from '../../assets/colors';
//import Theme from '../../assets/theme';
import Logo from '../atoms/Logo';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import imageLogo from '../../assets/images/Calcifer.png';

const SideMenu = ({navigation, modalVisible, setModalVisible}) => {
   const colors = useTheme().colors;
   //const theme = useColorScheme();
   //const colors = theme === 'dark' ? Theme.dark.colors : Theme.light.colors;

   const styles = StyleSheet.create({
      side: {
         //flex: 1,
         width: '60%',
         height: '90%',
         backgroundColor: colors.color,
         flexDirection: 'column',
         justifyContent: 'flex-start', // 'flex-start',
         paddingTop: 50,
      },
      logo: {
         width: '50%',
         flexDirection: 'row',
         justifyContent: 'center',
      },
      sections: {
         width: '100%',
         flexDirection: 'column',
         alignItems: 'flex-end',
         justifyContent: 'flex-start',
         paddingVertical: 30,
         paddingHorizontal: 10,
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

   return (
      <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible} //modalVisible
         onRequestClose={setModalVisible(false)}>
         <View style={styles.side}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
               <View style={styles.circle}>
                  <Image source={imageLogo} style={styles.image} />
               </View>
            </TouchableOpacity>
            <View style={styles.logo}></View>
            <View style={styles.sections}>
               <TouchableOpacity
                  onPress={() => navigation.navigate('Commands')}>
                  <Text style={styles.title}> Administración de comandas </Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                  <Text style={styles.title}> Configuración del menú </Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
                  <Text style={styles.title}> Reportes </Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   );
};

// <Logo navigation={navigation} menu={true} />
export default SideMenu;
