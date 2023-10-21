import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors';
import Logo from '../atoms/Logo';
import {useTheme} from '@react-navigation/native';
import SideMenu from './SideMenuModal';
import {useState} from 'react';
//import {useContext} from 'react';
//import {ThemeContext} from '../../../CoffeeMan';

const CustomHeader = ({navigation, title, name, setChange}) => {
   /*
   const theme = useContext(ThemeContext);
   const styles = StyleSheet.create({
      header: {
         width: '100%',
         height: 70,
         backgroundColor: theme.colors.background,
      },
      headerColor: {
         width: '100%',
         height: 50,
         backgroundColor: theme.colors.color,
         flexDirection: 'row',
         justifyContent: 'flex-start',
         borderBottomLeftRadius: 17,
         borderBottomRightRadius: 17,
         shadowColor: theme.colors.typography,
         elevation: 10,
      },
      logo: {
         width: '30%',
         flexDirection: 'row',
         justifyContent: 'center',
      },
      section: {
         width: '70%',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'flex-start',
      },
      image: {
         width: 30,
         height: 30,
      },
      title: {
         color: theme.colors.background,
         fontSize: 15,
         fontFamily: 'Imprima-Regular',
      },
   });
   */

   const colors = useTheme().colors;
   const styles = StyleSheet.create({
      header: {
         width: '100%',
         height: 70,
         backgroundColor: colors.background,
      },
      headerColor: {
         width: '100%',
         height: 50,
         backgroundColor: colors.color,
         flexDirection: 'row',
         justifyContent: 'flex-start',
         borderBottomLeftRadius: 17,
         borderBottomRightRadius: 17,
         shadowColor: colors.typography,
         elevation: 10,
      },
      logo: {
         width: '30%',
         flexDirection: 'row',
         justifyContent: 'center',
      },
      section: {
         width: '70%',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'flex-start',
      },
      image: {
         width: 30,
         height: 30,
      },
      title: {
         color: colors.background,
         fontSize: 15,
         fontFamily: 'Imprima-Regular',
      },
   });

   const imageCommands = require('../../assets/images/Command.png');
   const imageReports = require('../../assets/images/Report.png');
   const imageMenu = require('../../assets/images/Coffee.png');
   let icon;

   if (name == 'Reports') {
      icon = imageReports;
   } else if (name == 'Menu') {
      icon = imageMenu;
   } else {
      icon = imageCommands;
   }
   const [modalVisible, setModalVisible] = useState(false);
   return (
      <>
         <View style={styles.header}>
            <View style={styles.headerColor}>
               <View style={styles.logo}>
                  <TouchableOpacity
                     onPress={() => setModalVisible(!modalVisible)}>
                     <Logo navigation={navigation} />
                  </TouchableOpacity>
               </View>
               <View style={styles.section}>
                  <Image source={icon} style={styles.image} />
                  <Text style={styles.title}> {title}</Text>
               </View>
            </View>
         </View>
         <SideMenu
            navigation={navigation}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setChange={setChange}
         />
      </>
   );
};

//Opciòn para que el menu de secciones sea screen y no modal
//<TouchableOpacity onPress={() => navigation.navigate('Home')}>

export default CustomHeader;
