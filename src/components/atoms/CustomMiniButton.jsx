import {StyleSheet,View} from 'react-native'
import colors from '../../assets/colors'
import Menos from '../../assets/icons/menos.svg';
import Mas from '../../assets/icons/mas.svg';

const CustomMiniButton = props => {
    let Icon; 
    switch (props.type){
        case 1: //+
            Icon= <Menos width={15} height={15} fill={colors.color} />
            break;
        case 2: //-
            Icon= <Mas width={15} height={15} fill={colors.color} />
            break;
        default:
            console.log("Type de CustomButton incorrecto"); 
    }

    return (
            <View style={styles.icon}>
                {Icon}
            </View>
    );
};

const styles= StyleSheet.create({
    icon:{
        width: 15,
        height: 15,
        alignItems: 'center', 
        justifyContent: 'center',
    },
});

export default CustomMiniButton;
