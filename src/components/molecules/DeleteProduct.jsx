import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import colors from '../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteProduct =({ navigation, id}) => {
    const [product, setProduct] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const storedList = await AsyncStorage.getItem('products');

            if (storedList) {
                let products = JSON.parse(storedList);
                const index = products.findIndex((element) => element.id === id);
                if (index !== -1) {
                    //setPrice(products[index].price.toString());
                    setProduct(products[index].product);
                  }
            }
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);

    const onDelete = async () => {
        try {
            const currentValue = await AsyncStorage.getItem('products');
            if (currentValue) {
                let productList = JSON.parse(currentValue);
                const index = productList.findIndex((element) => element.id === id);
                if (index !== -1) {
                    productList.splice(index, 1);
                    const jsonValue = JSON.stringify(productList);
                    await AsyncStorage.setItem('products', jsonValue);
                }           
            }
        } catch (e) {
            console.error(e);
        }
        navigation.navigate('Menu');
    };


    return (
        <View style={styles.WarningContainer}>
            <Text style={styles.message}> ¿Estas seguro de eliminar <Text style={styles.boldText}>"{product}"</Text>?</Text>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                    <CustomButton type={6}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} >
                    <CustomButton type={5}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    WarningContainer: {
        width: '80%',
        height: 170,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',    
        backgroundColor: colors.gray2,
        borderRadius:7,
    },
    message:{
        fontSize: 15,
        fontFamily: "Jaldi-Regular",
        color: colors.typography,
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
    },
    boldText:{
        fontFamily: "Jaldi-Bold",
    },
    buttons: {
        width: '100%',
        //height: 150,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 50,
        alignItems:'center',    
        paddingVertical: 10,
    },
});

export default DeleteProduct
