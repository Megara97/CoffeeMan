import {StyleSheet,View,Text, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback} from 'react-native'
import colors from '../../assets/colors'
import { Shadow } from 'react-native-shadow-2';

const ShadowPresets = {
    general: {
        distance:3, 
        startColor:colors.typography+ "15", 
        endColor:colors.background, 
        offset:[7, 10],
    },
  };
  
const DATA = [
    {
        id: '1',
        client: 'Pepe Le Pew',
        products: [
            { product: 'Americano', quantity: 2},
            { product: 'Latte', quantity: 1},
          ],
        subtotal: 200
    },
    {
        id: '2',
        client: 'Benito Bodoque',
        products: [
            { product: 'Chocolate', quantity: 2},
            { product: 'Galleta', quantity: 1},
            { product: 'Americano', quantity: 1},
          ],
        subtotal: 350
    },
    {
        id: '3',
        client: '',
        products: [
            { product: 'Latte', quantity: 2},
          ],
        subtotal: 50
    },
];

const PRODUCTS = [
    {
        id: '1',
        product: 'Americano',
        price: 30
    },
    {
        id: '2',
        product: 'Latte',
        price: 35
    },
    {
        id: '3',
        product: 'Chocolate',
        price: 40
    },
    {
        id: '4',
        product: 'Galleta',
        price: 10
    },

];

const Item = ({navigation, client, subtotal}) => (
    <TouchableOpacity onPress={() => navigation.navigate('CommandDetails')} >
        <Shadow {...ShadowPresets.general}>
        <View style={styles.item}>
            <Text style={styles.client}> {client} </Text>
            <Text style={styles.subtotal}> Subtotal: $ {subtotal.toFixed(2)} </Text>
        </View>
        </Shadow>
    </TouchableOpacity>
  );

const CommandList = ({ navigation }) => {
    return (
        <View style={styles.listContainer}>
            <FlatList
            numColumns={1}
            data={DATA}
            renderItem={({item}) => <Item navigation={navigation} client={item.client} subtotal={item.subtotal} />}
            keyExtractor={item => item.id}
            />
        </View>

    );
};


const styles= StyleSheet.create({
    listContainer: {
        width: '100%', //'90%',
        flexDirection: 'column',
        alignItems: 'center', //
        justifyContent: 'center',
        //paddingTop:10,
    },
    item:{  
        //width: '100%',
        width: 350, //
        height: 45, 
        borderRadius: 17,
        backgroundColor: colors.gray2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //elevation: 3,
        paddingHorizontal: 20,
        marginVertical: 7,
        marginHorizontal: 5, //
    },
    client:{
        fontSize: 15,
        fontFamily: "Jaldi-Regular",
        color: colors.typography,
    },
    subtotal:{
        fontSize: 13,
        fontFamily: "Jaldi-Regular",
        color: colors.gray1,
    },
});

export default CommandList;