import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import ProductSection from '../components/organisms/ProductSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import NewProduct from '../components/molecules/NewProduct';
import InfoProduct from '../components/molecules/InfoProduct';
import DeleteProduct from '../components/molecules/DeleteProduct';
import {typography, spacing, radius} from '../styles/index';
import {useLocalStorage} from '../customHooks/useLocalStorage';
import {getProducts, getProduct, countProducts} from '../../api';

const Menu = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   const [change, setChange] = useState('');
   const [list, setList] = useLocalStorage('products', [], change);

   /*//Opcion usando info de base de datos
   const [list, setList] = useState([]);
   const loadProducts = async () => {
      const data = await getProducts();
      const number = await countProducts();
      const product = await getProduct(1);
      //console.log('Informaciòn de los productos en DB',data);
      //console.log('Numero de productos en DB', number);
      //console.log('Informaciòn del producto 1', product);
      setList(data);
   };
   useEffect(() => {
      loadProducts();
   }, []);*/

   /*const sortedData = [...list];

   useEffect(() => {
      //const sortedData = [...list];
      sortedData.sort((a, b) => a.product.localeCompare(b.product));
   }, [list, change]);*/

   /*const [list, setList] = useState([]);

   useEffect(() => {
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
      fetchData();
   }, [change, route.params]);

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
*/

   const [newVisible, setNewVisible] = useState(false);
   const [infoVisible, setInfoVisible] = useState(false);
   const [deleteVisible, setDeleteVisible] = useState(false);
   const [id, setId] = useState(0);
   return (
      <>
         <View style={styles.container}>
            <View style={styles.list}>
               <ProductSection
                  navigation={navigation}
                  setVisible={setInfoVisible}
                  setId={setId}
                  products={list}
               />
            </View>
            <View style={styles.new}>
               <TouchableOpacity onPress={() => setNewVisible(true)}>
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
         <NewProduct
            navigation={navigation}
            setChange={setChange}
            visible={newVisible}
            setVisible={setNewVisible}
            list={list}
            setList={setList}
         />
         <InfoProduct
            navigation={navigation}
            id={id}
            setChange={setChange}
            visible={infoVisible}
            setVisible={setInfoVisible}
            setDeleteVisible={setDeleteVisible}
         />
         <DeleteProduct
            navigation={navigation}
            id={id}
            setChange={setChange}
            visible={deleteVisible}
            setVisible={setDeleteVisible}
            setInfoVisible={setInfoVisible}
         />
      </>
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
export default Menu;
