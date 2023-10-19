import React, {useCallback, useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import colors from '../assets/colors';
import ProductSection from '../components/organisms/ProductSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';

const Menu = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = StyleSheet.create({
      container: {
         backgroundColor: colors.background,
         width: '100%',
         flex: 1,
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      commandList: {
         width: '100%',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      new: {
         width: '100%',
         height: 80,
         justifyContent: 'center',
         alignItems: 'center',
      },
   });

   const [list, setList] = useState([]);
   const fetchData = async () => {
      try {
         const storedList = await AsyncStorage.getItem('products');
         if (storedList) {
            setList(JSON.parse(storedList));
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchData();
   }, [route.params]); //route.params.change

   const deleteData = async () => {
      try {
         await AsyncStorage.removeItem('products');
         await AsyncStorage.removeItem('numberProducts');
         setList([]);
      } catch (e) {
         console.error(e);
      }
   };

   const getData = async () => {
      try {
         const jsonValue = await AsyncStorage.getItem('products');
         //const jsonValue = await AsyncStorage.getItem('numberProducts');
         console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (e) {
         console.error(e);
      }
   };

   return (
      <View style={styles.container}>
         <View style={styles.commandList}>
            <ProductSection navigation={navigation} products={list} />
         </View>
         <View style={styles.new}>
            <TouchableOpacity onPress={() => navigation.navigate('NewMenu')}>
               <CustomButton type={1} />
            </TouchableOpacity>
         </View>
      </View>
   );
};

/*            
            <TouchableOpacity onPress={() =>deleteData()} >
                <CustomButton type={2}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getData()} >
                <CustomButton type={3}/>
            </TouchableOpacity>
*/

export default Menu;
