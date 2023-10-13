import {StyleSheet,View,Text, TouchableOpacity} from 'react-native'
import colors from '../../assets/colors'
import CustomButton from '../atoms/CustomButton';
import { Shadow } from 'react-native-shadow-2';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  
const BottomCommand = ({ navigation, id}) => {
    const [numberProducts, setNumber] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const storedList = await AsyncStorage.getItem('commands');

            if (storedList) {
                let products = JSON.parse(storedList);
                const index = products.findIndex((element) => element.id === id);
                if (index !== -1) {
                    setNumber(products[index].products.length); /////MULTIPLICAR POR CANTIDAD
                    setSubtotal(products[index].subtotal);
                  }
            }
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);

    return (
       // <Shadow distance={15} startColor={colors.typography+ "30"} endColor={colors.background} style={styles.shadow}>
        <Shadow {...ShadowPresets.general}>
            <View style={styles.menuContainer}>
               <View style={styles.productsMenu}>
                    <Text style ={styles.title}> Productos ({numberProducts}) </Text>
                    <Text style ={styles.title}> $ {subtotal.toFixed(2)} </Text>
                </View>
                <View style={styles.buttonsMenu}>
                    <TouchableOpacity onPress={() => navigation.navigate('Products', {id: id})} >
                        <CustomButton type={1}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Pay', {id: id})} >
                        <CustomButton type={2}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Shadow>
    );
};

const styles= StyleSheet.create({
    shadow:{
        borderTopStartRadius: 17, 
        borderTopRightRadius: 17,
        flexDirection: 'row',
    },
    menuContainer:{
        //display:'flex',
        width: '100%',
        height: 110,
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
    title:{
        fontSize: 15,
        fontFamily: "Jaldi-Bold",
        color: colors.typography,
    },
});

export default BottomCommand;