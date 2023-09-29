import React from 'react';
import {Text, View, Button} from 'react-native';

const Commands = ({navigation , route}) => {
    return (
        <View>
          <Text>Comandas</Text>
                <View>
                <Button 
                    title="Comanda 1" 
                    onPress={() => 
                        navigation.navigate('CommandDetails', {id: 1})
                    } 
                />
            </View>
        </View>
    );  
};

export default Commands;