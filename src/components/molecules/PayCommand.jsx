import {StyleSheet,Image,View,Text, TouchableOpacity} from 'react-native'
import colors from '../../assets/colors'
import CustomButton from '../atoms/CustomButton';
import { Shadow } from 'react-native-shadow-2';
import { useState } from 'react';
import ButtonGroup from './ButtonGroup';

const ShadowPresets = {
    general: {
        distance:10, 
        startColor:colors.typography+ "30", 
        endColor:colors.background, 
        style:{
            borderTopStartRadius: 17, 
            borderTopRightRadius: 17,
            flexDirection: 'row',
        },
    },
  };
  
const PayCommand = ({ navigation }) => {
    const [tip, setTip] = useState(0);
    const [method, setMethod] = useState(0);
    const [tipC, setTipC] = useState('0');
    let numberProducts= 6;
    let subtotal= 141;
    let propina;
    switch (tip){
        case 0:
            propina=0;
            break;
        case 1:
            propina=subtotal*0.05;
            break;
        case 2:
            propina=subtotal*0.1;
            break;
        case 3:
            propina=subtotal*0.15;
            break;
        case 4:
            propina=subtotal*0.2;
            break;
        case 5:
            propina = tipC !== '' ? parseFloat(tipC) : 0;
            break;
        default:
            propina=0;
            break;
    }
    let total= subtotal + propina;

    //console.log(tipC);
    return (
         <Shadow {...ShadowPresets.general}>
            <View style={styles.menuContainer}>
               <View style={styles.productsMenu}>
                    <Text style ={styles.content}> Productos ({numberProducts}) </Text>
                    <Text style ={styles.content}> ${subtotal.toFixed(2)} </Text>
                </View>
               <View style={styles.productsMenu}>
                    <Text style ={styles.content}> Propina </Text>
                    <Text style ={styles.content}> ${propina.toFixed(2)} </Text>
                </View>
               <View style={styles.productsMenu}>
                    <Text style ={styles.bold}> Total </Text>
                    <Text style ={styles.bold}> ${total.toFixed(2)} </Text>
                </View>
                <View style={styles.buttonsGroups}>
                <ButtonGroup
                    title="Propina"
                    buttons={[{type:3, text:'0%'},{type:3, text:'5%'},{type:3, text:'10%'},{type:3, text:'15%'},{type:3, text:'20%'},{type:4, value:tipC, setValue:(newTip) => setTipC(newTip),}]}
                    selectedOption={tip}
                    onSelect={setTip}
                />
                <ButtonGroup
                    title="Método de pago"
                    buttons={[{type:1, text:''},{type:2, text:''},]}
                    selectedOption={method}
                    onSelect={setMethod}
                />
                </View>
                <View style={styles.buttonsMenu}>
                    <TouchableOpacity onPress={() => navigation.navigate('Commands')} >
                        <CustomButton type={5}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Shadow>
    );
};

const styles= StyleSheet.create({
    menuContainer:{
        //display:'flex',
        width: '100%',
        height: 240,
        backgroundColor: colors.gray2,
        flexDirection: 'columns',
        justifyContent: 'flex-end',
        paddingBottom:10,
        borderTopStartRadius: 17, 
        borderTopRightRadius: 17,
        alignItems: 'center',
    },
    productsMenu:{
        //flex: 1,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonsMenu:{
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    buttonsGroups:{
        width: '100%',
        flexDirection: 'colums',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    content:{
        fontSize: 13,
        fontFamily: "Jaldi-Regular",
        color: colors.typography,
    },
    bold:{
        fontSize: 15,
        fontFamily: "Jaldi-Bold",
        color: colors.typography,
    },
});

export default PayCommand;