import {StyleSheet,Image,View,Text, TouchableOpacity} from 'react-native'
import colors from '../../assets/colors'
import Logo from '../atoms/Logo';

const SideMenu = ({ navigation}) => {
    return (
        <View style={styles.side}>
            <View style={styles.logo}>
                <Logo navigation={navigation} menu={true}/>
            </View>
            <View style={styles.sections}>
                <TouchableOpacity onPress={() => navigation.navigate('Commands')} >
                    <Text style ={styles.title}> Administración de comandas </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                    <Text style ={styles.title}> Reportes </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Reports')} >
                    <Text style ={styles.title}> Configuración del menú </Text>
                </TouchableOpacity>
            </View>
        </View>    
    );
};

const styles= StyleSheet.create({
    side:{
        width: '60%',
        height: '100%',
        backgroundColor: colors.color,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    logo:{
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    sections:{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingVertical:30,
        paddingHorizontal:10,
    },
    title:{
        color: colors.background,
        fontSize: 15,
        fontFamily: "Imprima-Regular",
        textAlign:'left',
        paddingVertical:7,
    },
});

export default SideMenu;