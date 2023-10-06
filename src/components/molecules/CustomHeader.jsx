import {StyleSheet,Image,View,Text} from 'react-native'
import colors from '../../assets/colors'
import Logo from '../atoms/Logo';

const CustomHeader = ({ navigation, title, name}) => {
    const imageCommands = require('../../assets/images/Command.png');
    const imageReports = require('../../assets/images/Report.png');
    const imageMenu = require('../../assets/images/Coffee.png');
    let icon; 

    //console.log(name);
    //console.log(title);
    if (name=='Reports'){
        icon = imageReports;
    }
    else if (name=='Menu'){
        icon = imageMenu;
    }
    else {
        icon = imageCommands;
    }

    return (
        <View style={styles.header}>
            <View style={styles.headerColor}>
                <View style={styles.logo}>
                    <Logo navigation={navigation}/>
                </View>
                <View style={styles.section}>
                    <Image source={icon} style={styles.image}/>
                    <Text style ={styles.title}> {title}</Text>
                </View>
            </View>    
        </View>

    );
};

const styles= StyleSheet.create({
    header:{
        width: '100%',
        height: 70,
        backgroundColor: colors.background,
    },
    headerColor:{
        width: '100%',
        height: 50,
        backgroundColor: colors.color,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomLeftRadius: 17, 
        borderBottomRightRadius: 17,
        shadowColor: colors.typography,
        elevation:10,
    },
    logo:{
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
        //paddingLeft:'5%'
    },
    section:{
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        //paddingRight:'5%'
    },
    image:{
        width: 30, 
        height: 30, 
        //borderRadius: 15
    },
    title:{
        color: colors.background,
        fontSize: 15,
        fontFamily: "Imprima-Regular",
    },
});

export default CustomHeader;