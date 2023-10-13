import React, { useEffect, useState } from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CustomButton from '../components/atoms/CustomButton';
import colors from '../assets/colors'
import CommandList from '../components/molecules/CommandList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Commands = ({navigation, route}) => {
    const [list, setList] = useState([]);
    const fetchData = async () => {
        try {
          const storedList = await AsyncStorage.getItem('commands');
          if (storedList) {
            setList(JSON.parse(storedList));
          }
        } catch (error) {
          console.error(error);
        }
      }
    
    useEffect(() => {
        fetchData();
    }, []);
    
    /*useFocusEffect(
        useCallback(() => {
            fetchData();   
            console.log('Componente en foco')
        })
    );*/

    const onNew = async () => {
        try {
            let commandList = [];
            const currentValue = await AsyncStorage.getItem('commands');
            if (currentValue) {
                commandList = JSON.parse(currentValue);
            }
            const Id = await AsyncStorage.getItem('numberCommands');
            let lastId= JSON.parse(Id)+1;
            if (!lastId) {
                lastId=1;
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
            AsyncStorage.setItem('commands',JSON.stringify(commandList));
            AsyncStorage.setItem('numberCommands',JSON.stringify(lastId+1));
            navigation.navigate('CommandDetails', {id:lastId})
        } catch (e) {
            console.log(e);
        }
    };

    const deleteData = async () => {
        try {
            await AsyncStorage.removeItem('commands');
            await AsyncStorage.removeItem('numberCommands');
            setList([]);
        } catch (e) {
          console.log(e);
        }
      };

      const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('commands');
            //const jsonValue = await AsyncStorage.getItem('numberCommands');
            console.log (jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch (e) {
            console.log(e);
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.commandList}>
                <CommandList navigation={navigation} commands={list}/>
            </View>  
            <View style={styles.new}>
                <TouchableOpacity onPress={onNew} >
                    <CustomButton type={1}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>deleteData()} >
                    <CustomButton type={2}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getData()} >
                    <CustomButton type={3}/>
                </TouchableOpacity>
        
            </View>
        </View>
    );  
};

const styles= StyleSheet.create({
    container:{
        backgroundColor: colors.background,
        width: '100%',
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        //height: '90%',
    },
    commandList:{
        //flex:1,
        width: '100%',
        //height: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    new:{
        //flex:0,
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Commands;