import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'react-native';
import Home from './src/screens/Home';
import Commands from './src/screens/Commands';
import Reports from './src/screens/Reports';
import Menu from './src/screens/Menu';
import CommandDetails from './src/screens/CommandDetails';
import Pay from './src/screens/Pay';

const Stack = createNativeStackNavigator();

const CoffeeMan = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Commands" component={Commands} />
                <Stack.Screen name="Reports" component={Reports} />
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="CommandDetails" component={CommandDetails} />
                <Stack.Screen name="Pay" component={Pay} />
            </Stack.Navigator>
        </NavigationContainer> 
    );
};

export default CoffeeMan;


/*
<Stack.Group>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Commands" component={Commands} />
                    <Stack.Screen name="Reports" component={Reports} />
                    <Stack.Screen name="Menu" component={Menu} />
                </Stack.Group>
                */