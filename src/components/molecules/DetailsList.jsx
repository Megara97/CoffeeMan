import {StyleSheet,View,Text, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, TextInput} from 'react-native'
import colors from '../../assets/colors'
import { Shadow } from 'react-native-shadow-2';
import DETAILS from '../../assets/data/details';
import { useState } from 'react';
import CustomMiniButton from '../atoms/CustomMiniButton';

const ShadowPresets = {
    general: {
        distance:3, 
        startColor:colors.typography+ "15", 
        endColor:colors.background, 
        offset:[7, 10],
    },
  };

const Item = ({navigation, number, product, subtotal, total}) => {
    const [quantity, setQuantity] = useState(number);
    total= quantity*subtotal;   
    const onLess = () => {
        if (quantity>1){
            setQuantity(quantity-1);
        }
    };
    const onMore = () => {
        setQuantity(quantity+1);
    };

    return (
        <View style={styles.item}>
            <View style={styles.quantity}>
                <TouchableOpacity onPress={onLess} >
                    <CustomMiniButton type={1}/>
                </TouchableOpacity>
                <TextInput style={styles.input} onChangeText={(text) => setQuantity(parseInt(text))} value={quantity.toString()} keyboardType='numeric' />
                <TouchableOpacity onPress={onMore} >
                    <CustomMiniButton type={2}/>
                </TouchableOpacity>
            </View>
            <Text style={[styles.text, {width: '40%',}]}> {product} </Text> 
            <Text style={styles.textlight}> $ {subtotal.toFixed(2)} </Text>
            <Text style={[styles.text, {width: '20%', textAlign: 'right',}]}> $ {total.toFixed(2)} </Text>
        </View>
  );
};



const DetailsList = ({ navigation }) => {
    const [list, setList] = useState(DETAILS);
    return (
        <View style={styles.Container}>
            <View style={styles.listContainer}>
                <FlatList
                numColumns={1}
                data={list[1].products} //ASIGNAR CORRECTAMENTE
                renderItem={({item}) => <Item navigation={navigation} product={item.product} number={item.quantity} subtotal={item.price} />}
                keyExtractor={item => item.id}
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
        justifyContent: 'flex-start',
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