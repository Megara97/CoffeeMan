import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Logo from '../atoms/Logo';
import {useTheme} from '@react-navigation/native';
import SideMenu from '../molecules/SideMenuModal';
import {useState} from 'react';
import {typography, spacing, radius} from '../../styles/index';
import Command from '../../assets/icons/command.svg';
import Menu from '../../assets/icons/menu.svg';
import Report from '../../assets/icons/report.svg';
import Costs from '../../assets/icons/cost.svg';

const CustomHeader = ({navigation, title, name, setChange, change}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);
   const size = 30;

   const [modalVisible, setModalVisible] = useState(false);

   const selectIcon = () => {
      let Icon;
      if (name == 'Reports') {
         Icon = <Report width={size} height={size} fill={colors.background} />;
      } else if (name == 'Menu') {
         Icon = <Menu width={size} height={size} fill={colors.background} />;
      } else if (name == 'Costs') {
         Icon = <Costs width={size} height={size} fill={colors.background} />;
      } else {
         Icon = <Command width={size} height={size} fill={colors.background} />;
      }
      return Icon;
   };

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
                  {selectIcon()}
                  <Text style={styles.title}>
                     {'  '}
                     {title}
                  </Text>
               </View>
            </View>
         </View>
         <SideMenu
            navigation={navigation}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setChange={setChange}
            change={change}
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
         flexDirection: 'row',
         justifyContent: 'flex-start',
         borderBottomLeftRadius: radius.s,
         borderBottomRightRadius: radius.s,
      },
      logo: {
         //width: '30%',
         width: 120,
         flexDirection: 'row',
         justifyContent: 'center',
      },
      section: {
         width: '70%',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'flex-start',
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
