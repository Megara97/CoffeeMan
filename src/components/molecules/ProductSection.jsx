import {StyleSheet,View,Text, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback} from 'react-native'
import colors from '../../assets/colors'
import PRODUCTS from '../../assets/data/products';
import { useEffect, useState } from 'react';
import Search from '../atoms/Search';
import ProductList from '../atoms/ProductList';

const ProductSection = ({ navigation }) => {
    const [list, setList] = useState(PRODUCTS); //lista con cambios
    const [defaultList, setDefaultList] = useState([]); //lista original
    const [text, setText] = useState(''); //palabra para buscar

    useEffect(() => {
        setDefaultList(PRODUCTS);
        setList(PRODUCTS);
      }, []);

    return (
        <View style={styles.container}>
            <Search
                _onChangeText={setText}
                textToSearch={text}
                //value={text}
                data={defaultList}
                _setDataSort={setList}
            />
            <ProductList navigation={navigation} list={list}/>
        </View>

    );
};

const styles= StyleSheet.create({
    container: {
        width: '100%',
        //height: 500,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop:10,
    },
});

export default ProductSection;