import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Logo from '../atoms/Logo';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../../styles/index';

const SideMenu = ({navigation}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   return (
      <View style={styles.side}>
         <View style={styles.logo}>
            <Logo navigation={navigation} menu={true} />
         </View>
         <View style={styles.sections}>
            <TouchableOpacity onPress={() => navigation.navigate('Commands')}>
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
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      side: {
         width: '70%',
         height: '100%',
         backgroundColor: colors.color1,
         flexDirection: 'column',
         justifyContent: 'space-between',
      },
      logo: {
         width: '50%',
         flexDirection: 'row',
         justifyContent: 'center',
      },
      sections: {
         width: '100%',
         flexDirection: 'column',
         justifyContent: 'flex-start',
         alignItems: 'flex-end',
         paddingVertical: spacing.xl,
         paddingHorizontal: spacing.m,
      },
      title: {
         color: colors.background,
         ...typography.header,
         textAlign: 'left',
         paddingVertical: spacing.s,
      },
   });
};

export default SideMenu;
