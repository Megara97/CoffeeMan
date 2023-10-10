import {StyleSheet,Appearance,Image,TouchableOpacity,View,Text, TextInput} from 'react-native'
import colors from '../../assets/colors'
import { SvgXml } from 'react-native-svg';
import efectivoB from '../../assets/icons/efectivoB.png';
import efectivoW from '../../assets/icons/efectivoW.png';
import tarjetaB from '../../assets/icons/tarjetaB.png';
import tarjetaW from '../../assets/icons/tarjetaW.png';

const CustomLittleButton = props => {
    let icon; 
    //console.log(props.active);
    switch (props.type){
        case 1: //Efectivo
            if (props.active == true){
                icon = Appearance.getColorScheme() === 'dark' ? efectivoB : efectivoW;
            } else {
                icon = Appearance.getColorScheme() === 'dark' ? efectivoW : efectivoB;
            }
            Component=<Image source={icon} style={styles.icon}/> 
            break;
        case 2: //Tarjeta
            if (props.active == true){
                icon = Appearance.getColorScheme() === 'dark' ? tarjetaB : tarjetaW;
            } else {
                icon = Appearance.getColorScheme() === 'dark' ? tarjetaW : tarjetaB;
            }
            Component=<Image source={icon} style={styles.icon}/> 
            break;
        case 3: //Texto
            Component=<Text style={[styles.text, {color: props.active ? colors.background: colors.typography}]}> {props.text} </Text>
            break;
        case 4: //Input
            Component=(
            <View style={styles.ovalLarge}>
                <Text style={[styles.text, {color: props.active ? colors.background: colors.typography}]}> $ </Text>
                <TextInput value={props.value} onChangeText={props.setValue} onFocus={() => props.onSelect(props.index)} keyboardType="numeric" style={[styles.input, {color: props.active ? colors.background: colors.typography}]}/> 
            </View>
            );
            //value={props.value}
            //onSubmitEditing={props.setValue}
        break;
        default:
            console.log("Type de CustomLittleButton incorrecto"); 
    }
    return (
        <View style={[[styles.oval, props.type === 4 && styles.ovalLarge], {backgroundColor: props.active ? colors.color: colors.gray1}]}>
            {Component}
        </View>
    );
};

const styles= StyleSheet.create({
    oval:{
        width: 30,
        height: 22,
        borderRadius: 17, 
        alignItems: 'center', 
        justifyContent: 'center',
        //elevation:3,
    },
    ovalLarge:{
        width: 50,
        height: 22,
        borderRadius: 17, 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        //elevation:3,
    },
    icon:{
        width: 15, 
        height: 15, 
    },
    text:{
        fontSize:13,
        fontFamily: "Jaldi-Regular",
    },
    input: {
        paddingHorizontal: 0,
        paddingVertical:0,
        fontSize:13,
        fontFamily: "Jaldi-Regular",
    },
});

export default CustomLittleButton;