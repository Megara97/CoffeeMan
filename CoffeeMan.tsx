import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/No/Home';
import Commands from './src/screens/Commands';
import Reports from './src/screens/Reports';
import Menu from './src/screens/Menu';
import CommandDetails from './src/screens/CommandDetails';
import Products from './src/screens/Products';
import Pay from './src/screens/Pay';
import CustomHeader from './src/components/molecules/CustomHeader';
import {getHeaderTitle} from '@react-navigation/elements';
import Delete from './src/screens/No/Delete';
import InfoMenu from './src/screens/No/InfoMenu';
import NewMenu from './src/screens/No/NewMenu';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from './src/styles/colors';
//import Theme from './src/assets/theme';

const Stack = createNativeStackNavigator();
//export const ThemeContext = React.createContext({});

const CoffeeMan = () => {
   const [change, setChange] = useState('');
   const [theme, setTheme] = useState('light');
   const systemColorScheme = useColorScheme();

   /*
   const [systemMode, setSystemMode] = useState(true);
   const [darkMode, setDarkMode] = useState(false);
   let theme;
   if (systemMode === true) {
      theme = systemColorScheme;
   } else {
      theme = darkMode ? 'dark' : 'light';
   }*/

   useEffect(() => {
      const fetchData = async () => {
         try {
            const storageSystemMode = await AsyncStorage.getItem(
               'systemColorScheme',
            );
            if (storageSystemMode === 'false') {
               const storageDarkScheme = await AsyncStorage.getItem(
                  'darkScheme',
               );
               if (storageDarkScheme !== null) {
                  setTheme(JSON.parse(storageDarkScheme) ? 'dark' : 'light');
               } else {
                  setTheme('light');
               }
            } else {
               setTheme(systemColorScheme);
            }
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, [change, systemColorScheme]);

   return (
      //<ThemeContext.Provider value={themeMode === 'dark' ? darkTheme : theme}>
      <NavigationContainer theme={theme === 'dark' ? Theme.dark : Theme.light}>
         <Stack.Navigator
            initialRouteName="Commands"
            screenOptions={{
               header: ({navigation, route, options}) => {
                  const title = getHeaderTitle(options, route.name);
                  return (
                     <CustomHeader
                        name={route.name}
                        title={title} //options.title
                        navigation={navigation}
                        setChange={setChange}
                     />
                  );
               },
            }}>
            <Stack.Screen
               name="Home"
               component={Home}
               options={{headerShown: false}}
            />
            <Stack.Screen
               name="Commands"
               component={Commands}
               options={{title: 'Administración de comandas'}}
            />
            <Stack.Screen
               name="CommandDetails"
               component={CommandDetails}
               options={{title: 'Comanda'}}
            />
            <Stack.Screen
               name="Products"
               component={Products}
               options={{title: 'Productos'}}
            />
            <Stack.Screen
               name="Pay"
               component={Pay}
               options={{title: 'Pago'}}
            />
            <Stack.Screen
               name="Reports"
               component={Reports}
               options={{title: 'Reportes'}}
            />
            <Stack.Screen
               name="Menu"
               component={Menu}
               options={{title: 'Configuración del menu'}}
            />
            <Stack.Screen
               name="Delete"
               component={Delete}
               options={{headerShown: false}}
            />
            <Stack.Screen
               name="InfoMenu"
               component={InfoMenu}
               options={{headerShown: false}}
            />
            <Stack.Screen
               name="NewMenu"
               component={NewMenu}
               options={{headerShown: false}}
            />
         </Stack.Navigator>
      </NavigationContainer>
      //</ThemeContext.Provider>
   );
};

export default CoffeeMan;

/* Opción donde no se personaliza el header, sino solo se agrega el componente Logo
                screenOptions={({ navigation }) => ({
                    //headerLeft: () => <Logo navigation={navigation} />,
                })}>
*/
