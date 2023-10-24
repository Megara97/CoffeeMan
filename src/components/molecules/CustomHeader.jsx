import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Logo from '../atoms/Logo';
import {useTheme} from '@react-navigation/native';
import SideMenu from './SideMenuModal';
import {useState} from 'react';
import {typography, spacing, radius} from '../../styles/index';

const CustomHeader = ({navigation, title, name, setChange}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

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

const ComponentStyle = colors => {
   return StyleSheet.create({
      header: {
         width: '100%',
         height: 70,
         backgroundColor: colors.background,
      },
      headerColor: {
         width: '100%',
         height: 55,
         backgroundColor: colors.color1,
         shadowColor: colors.typography,
         elevation: 10,
         flexDirection: 'row',
         justifyContent: 'flex-start',
         borderBottomLeftRadius: radius.s,
         borderBottomRightRadius: radius.s,
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
         ...typography.header,
      },
   });
};

export default CustomHeader;

/*
Opciòn usando un ThemeContext
import {useContext} from 'react';
import {ThemeContext} from '../../../CoffeeMan';
const theme = useContext(ThemeContext);
//backgroundColor: theme.colors.background,
*/
