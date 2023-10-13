import {StyleSheet,View,Text, TouchableOpacity, FlatList, TextInput} from 'react-native'
import colors from '../../assets/colors'
import { useEffect, useState } from 'react';
import CustomMiniButton from '../atoms/CustomMiniButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({navigation, id, number, product, subtotal, setChange}) => {
    const [quantity, setQuantity] = useState(number);
    let total= quantity*subtotal;   

    return (
        <View style={styles.item}>
            <View style={styles.quantity}>
                <Text style={styles.text}> {quantity} </Text> 
            </View>
            <Text style={[styles.text, {width: '40%',}]}> {product} </Text> 
            <Text style={styles.textlight}> $ {subtotal.toFixed(2)} </Text>
            <Text style={[styles.text, {width: '20%', textAlign: 'right',}]}> $ {total.toFixed(2)} </Text>
        </View>
  );
};

const DetailsList = ({ navigation, id }) => {
    const [list, setList] = useState([]);
    const fetchData = async () => {
        try {
          const currentValue = await AsyncStorage.getItem('commands');
          const currentProducts = await AsyncStorage.getItem('products');

          let productList=[];
          if (currentProducts){
              productList = JSON.parse(currentProducts);
          }

          if (currentValue) {
            let commands = JSON.parse(currentValue);
                const index = commands.findIndex((element) => element.id === id);
                if (index !== -1) {
                    commands[index].products.forEach((productInOrder) => {
                        const productInfo = productList.find((productInfo) => productInfo.product === productInOrder.product);
                        if (productInfo) {
                          productInOrder.price = productInfo.price;
                        }
                      });
                    setList(commands[index].products);
                }
          }
        } catch (error) {
          console.error(error);
        }
      }
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.Container}>
            <View style={styles.listContainer}>
                <FlatList
                numColumns={1}
                data={list}
                renderItem={({item}) => (
                    <Item 
                        navigation={navigation} 
                        id={id}
                        product={item.product} 
                        number={item.quantity} 
                        subtotal={item.price} 
                    />
                )}
                />
            </View>
        </View>
    );
};

const styles= StyleSheet.create({
    Container: {
        width: '100%', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        paddingVertical:20,
    },
    listContainer: {
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: colors.gray2,
        borderRadius: 17,
    },
    item:{  
        width: '100%',
        height: 30, 
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomColor: colors.gray1,
        borderBottomWidth:1,
    },
    quantity:{  
        width: '20%', //80,
        height: 30, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 25,
        height: 20, 
        //marginHorizontal: 5,
        backgroundColor: colors.background,
        paddingVertical: 0,
        fontFamily: "Jaldi-Regular",
        textAlign:'center',
        fontSize:13,
    },
    text:{
        fontSize: 13,
        fontFamily: "Jaldi-Regular",
        color: colors.typography,
        //borderWidth:1,
    },
    textlight:{
        fontSize: 13,
        width: '20%', //70,
        fontFamily: "Jaldi-Regular",
        color: colors.mediumGray,
        textAlign: 'right',
    },
});

export default DetailsList;