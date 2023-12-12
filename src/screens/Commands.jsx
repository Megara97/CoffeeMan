import React, {createContext, useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ActiveCommands from './ActiveCommands';
import PaidCommands from './PaidCommands';
import {useTheme} from '@react-navigation/native';
import Active from '../assets/icons/active.svg';
import Paid from '../assets/icons/paid.svg';

const Tab = createBottomTabNavigator();
const CommandContext = createContext(); //Se puede aprovechar con el AsyncStorage

const Commands = ({navigation, route}) => {
   const colors = useTheme().colors;

   return (
      <CommandContext.Provider value={route.params}>
         <Tab.Navigator
            screenOptions={{
               headerShown: false,
               tabBarLabelPosition: 'beside-icon',
               tabBarActiveTintColor: colors.background,
               tabBarInactiveTintColor: colors.typography,
               tabBarActiveBackgroundColor: colors.color1, //colors.overlay,
               tabBarInactiveBackgroundColor: colors.secondary,
            }}>
            <Tab.Screen
               name="ActiveCommands"
               component={ActiveCommands}
               options={{
                  title: 'Comandas activas',
                  tabBarIcon: ({color, size}) => (
                     <Active width={size} height={size} fill={color} />
                  ),
               }}
            />
            <Tab.Screen
               name="PaidCommands"
               component={PaidCommands}
               options={{
                  title: 'Comandas pagadas',
                  tabBarIcon: ({color, size}) => (
                     <Paid width={size} height={size} fill={color} />
                  ),
               }}
            />
         </Tab.Navigator>
      </CommandContext.Provider>
   );
};
export {CommandContext};
export default Commands;
