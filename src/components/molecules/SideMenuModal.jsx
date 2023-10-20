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

const SideMenu = ({navigation, modalVisible, setModalVisible}) => {
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

export default SideMenu;
