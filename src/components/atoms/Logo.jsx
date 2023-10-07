import {StyleSheet,Image,TouchableOpacity,View} from 'react-native'
import colors from '../../assets/colors'
import imageLogo from '../../assets/images/Calcifer.png';

const Logo = ({ navigation, menu }) => {
    /*const onChange = () => {
        if (menu===true){
            navigation.goBack();    
        }
        else {
            navigation.navigate('Home')
        }
    //onPress={onChange}
    };*/
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Home')} >
            <View style={styles.circle}>
                <Image source={imageLogo} style={styles.image}/>
            </View>
        </TouchableOpacity>
    );
};

const styles= StyleSheet.create({
    circle:{
        width: 70,
        height: 70,
        borderRadius: 35, 
        backgroundColor: colors.gray1,
        alignItems: 'center', // Centra horizontalmente
        justifyContent: 'center', // Centra verticalmente

    },
    image:{
        width: 50, 
        height: 50, 
    }
});

export default Logo;

//Otra forma de llamar el archivo de imagen para utilizarlo
//const imageLogo = require('../../assets/images/Calcifer.png');