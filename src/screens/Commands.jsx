import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import CommandList from '../components/molecules/CommandList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../styles/index';
import {useLocalStorage} from '../customHooks/useLocalStorage';

const Commands = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [list, setList] = useLocalStorage('commands', [], route.params);

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
      };
      let newValue = list.slice();
      newValue.push(newElement);
      setList(newValue);
      navigation.navigate('CommandDetails', {id: lastId});
   };

   /*
   const [list, setList] = useState([]);
   
   useEffect(() => {
      const fetchData = async () => {
         try {
            const storedList = await AsyncStorage.getItem('commands');
            if (storedList) {
               setList(JSON.parse(storedList));
            }
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, [route.params]);

   const onNew = async () => {
      try {
         let commandList = [];
         const currentValue = await AsyncStorage.getItem('commands');
         if (currentValue) {
            commandList = JSON.parse(currentValue);
         }
         
         /*const Id = await AsyncStorage.getItem('numberCommands');
         let lastId = JSON.parse(Id) + 1;
         if (!lastId) {
            lastId = 1;
         }*/ /*

         let lastId = 1;
         if (commandList.length !== 0) {
            lastId = commandList[commandList.length - 1].id + 1;
         }

         const newElement = {
            id: lastId,
            client: '',
            notes: '',
            products: [],
            subtotal: 0,
         };

         commandList.push(newElement);
         setList(commandList);
         AsyncStorage.setItem('commands', JSON.stringify(commandList));
         //AsyncStorage.setItem('numberCommands', JSON.stringify(lastId));
         navigation.navigate('CommandDetails', {id: lastId});
      } catch (e) {
         console.error(e);
      }
   };
   

   const deleteData = async () => {
      try {
         await AsyncStorage.removeItem('commands');
         //await AsyncStorage.removeItem('numberCommands');
         setList([]);
      } catch (e) {
         console.error(e);
      }
   };

   const getData = async () => {
      try {
         const jsonValue = await AsyncStorage.getItem('commands');
         //const jsonValue = await AsyncStorage.getItem('numberCommands');
         console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (e) {
         console.error(e);
      }
   };*/

   return (
      <View style={styles.container}>
         <View style={styles.list}>
            <CommandList navigation={navigation} list={list} />
         </View>
         <View style={styles.new}>
            <TouchableOpacity onPress={newCommand}>
               <CustomButton type={1} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setList([])}>
               <CustomButton type={4} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log(list)}>
               <CustomButton type={3} />
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

<TouchableOpacity onPress={() =>deleteData()} >
   <CustomButton type={4}/>
</TouchableOpacity>
<TouchableOpacity onPress={() => getData()} >
    <CustomButton type={3}/>
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
         height: '85%',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      new: {
         width: '100%',
         height: '15%',
         flexDirection: 'column',
         justifyContent: 'flex-end',
         alignItems: 'center',
         paddingBottom: spacing.l,
      },
   });
};

export default Commands;
