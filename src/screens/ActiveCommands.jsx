import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import CommandList from '../components/molecules/CommandListGeneral';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../styles/index';
import {useLocalStorage} from '../customHooks/useLocalStorage';

const Commands = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [list, setList] = useLocalStorage('commands', [], route.params);
   const [commands, setCommands] = useState([]);

   useEffect(() => {
      activeCommands = list.filter(item => item.status === 'active');
      setCommands(activeCommands);
   }, [list]);

   const newCommand = () => {
      let lastId = 1;
      if (list.length !== 0) {
         lastId = list[list.length - 1].id + 1;
      }
      const newElement = {
         id: lastId,
         client: '',
         notes: '',
         products: [],
         subtotal: 0,
         openingDate: new Date(),
         status: 'active',
      };
      let newValue = list.slice();
      newValue.push(newElement);
      setList(newValue);
      navigation.navigate('CommandDetails', {id: lastId});
   };

   return (
      <View style={styles.container}>
         <View style={styles.list}>
            <CommandList navigation={navigation} list={commands} />
         </View>
         <View style={styles.new}>
            <TouchableOpacity onPress={newCommand}>
               <CustomButton type={1} />
            </TouchableOpacity>
         </View>
      </View>
   );
};

/*              
            <TouchableOpacity onPress={() => setList([])}>
               <CustomButton type={4} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log(list)}>
               <CustomButton type={3} />
            </TouchableOpacity>
*/

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '100%',
         height: '100%',
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         backgroundColor: colors.background,
      },
      list: {
         width: '100%',
         flex: 1,
         justifyContent: 'flex-start',
         alignItems: 'center',
         marginBottom: spacing.xs,
      },
      new: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'flex-end',
         alignItems: 'center',
         marginBottom: spacing.l,
         paddingHorizontal: spacing.l,
      },
   });
};

export default Commands;
