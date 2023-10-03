import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Commands from './src/screens/Commands';
import Reports from './src/screens/Reports';
import Menu from './src/screens/Menu';
import CommandDetails from './src/screens/CommandDetails';
import Pay from './src/screens/Pay';
import CustomHeader from './src/components/molecules/CustomHeader';
import { getHeaderTitle } from '@react-navigation/elements';

const Stack = createNativeStackNavigator();

const CoffeeMan = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Home"
                screenOptions={{
                    header: ({ navigation, route, options}) => {
                        const title = getHeaderTitle(options, route.name);
                        return (
                            <CustomHeader
                                name= {route.name} 
                                title={title} //options.title
                                navigation={navigation}
                            />
                        );
                }
            }}
            >
                <Stack.Screen name="Home" component={Home} options={{ headerShown:false }} />
                <Stack.Screen name="Commands" component={Commands} options={{title: 'Administración de comandas',}} />
                <Stack.Screen name="Reports" component={Reports} options={{title: 'Reportes',}} />
                <Stack.Screen name="Menu" component={Menu}options={{title: 'Configuración del menu',}} />
                <Stack.Screen name="CommandDetails" component={CommandDetails} options={{title: 'Comanda',}} />
                <Stack.Screen name="Pay" component={Pay} options={{title: 'Pago',}} />
            </Stack.Navigator>
        </NavigationContainer> 
    );
};

export default CoffeeMan;


/* Opción donde no se personaliza el header, sino solo se agrega el componente Logo
                screenOptions={({ navigation }) => ({
                    //headerLeft: () => <Logo navigation={navigation} />,
                })}>
*/