import {StyleSheet,View,Text, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback} from 'react-native'
import colors from '../../assets/colors'
import { Shadow } from 'react-native-shadow-2';

const ShadowPresets = {
    general: {
        distance:5, 
        startColor:colors.typography+ "10", 
        endColor:colors.background, 
        offset:[7, 7],
    },
  };
  
const PRODUCTS = [
    {
        id: '1',
        product: 'Americano',
        price: 30,
    },
    {
        id: '2',
        product: 'Latte',
        price: 35,
    },
    {
        id: '3',
        product: 'Chocolate',
        price: 40,
    },
    {
        id: '4',
        product: 'Galleta con chispas',
        price: 10,
    },
    {
        id: '5',
        product: 'Emparedado',
        price: 12,
    },

];

const Item = ({navigation, product, price}) => (
    <TouchableOpacity onPress={() => navigation.navigate('CommandDetails')} >
        <Shadow {...ShadowPresets.general}>
        <View style={styles.item}>
            <Text style={styles.product}> {product} </Text>
            <Text style={styles.price}> $ {price.toFixed(2)} </Text>
        </View>
        </Shadow>
    </TouchableOpacity>
  );

const ProductList = ({ navigation }) => {
    return (
        <View style={styles.listContainer}>
            <FlatList
            numColumns={3}
            data={PRODUCTS}
            renderItem={({item}) => <Item navigation={navigation} product={item.product} price={item.price} />}
            keyExtractor={item => item.id}
            />
        </View>

    );
};

const styles= StyleSheet.create({
    listContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        //paddingTop:10,
    },
    item:{  
        //width: '100%',
        width: 100,
        height: 80,
        borderRadius: 17,
        backgroundColor: colors.gray2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        //elevation: 3,
        paddingVertical:10,
        marginVertical: 7,
        marginHorizontal: 7,
    },

    
    product:{
        fontSize: 15,
        fontFamily: "Jaldi-Regular",
        textAlign:'center',
        lineHeight:20,
        color: colors.typography,
    },
    price:{
        fontSize: 13,
        fontFamily: "Jaldi-Regular",
        color: colors.typography,
    },
});

export default ProductList;