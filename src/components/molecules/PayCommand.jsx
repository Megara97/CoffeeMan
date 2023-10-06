import {StyleSheet,Image,View,Text, TouchableOpacity} from 'react-native'
import colors from '../../assets/colors'
import CustomButton from '../atoms/CustomButton';
import { Shadow } from 'react-native-shadow-2';

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
    let numberProducts= 6;
    let subtotal= 141;
    let propina= 0;
    let total= 141;
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
        height: 200,
        backgroundColor: colors.gray2,
        flexDirection: 'columns',
        justifyContent: 'flex-end',
        paddingBottom:10,
        borderTopStartRadius: 17, 
        borderTopRightRadius: 17,
        alignItems: 'center',
        //borderTopWidth: 5,
        //borderLeftWidth: 5,
        //borderRightWidth: 5,
        //borderColor: colors.typography + "40",
        //elevation: 17,
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