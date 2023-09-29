import React from 'react';
import {Text, View, Button} from 'react-native';

const Home = ({navigation , route}) => {
    const onStart = () => {
        navigation.navigate('Commands');
    };
    const onChangeConfig = () => {
        navigation.navigate('Menu');
    };
    const onReport = () => {
        navigation.navigate('Reports');
    };
    return (
        <View>
          <Text>Hola</Text>
          <Button title="Administración de comandas" onPress={onStart} />
          <Button title="Reportes" onPress={onReport}/>
          <Button title="Configuración del menú" onPress={onChangeConfig}/>
        </View>
    );
};

export default Home;

/*
            <Button 
                title="Administración ssfsf" 
                onPress={() => navigation.navigate('Commands')} 
            />

*/