import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CostList from '../components/molecules/CostListGeneral';
import {useTheme} from '@react-navigation/native';
import {typography, spacing, radius} from '../styles/index';
import {useLocalStorage} from '../customHooks/useLocalStorage';
import PeriodSelector from '../components/organisms/PeriodSelector';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import DeleteCost from '../components/molecules/DeleteCost';
import InfoCost from '../components/organisms/InfoCost';

const Costs = ({navigation, route}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);
   const now = new Date();

   const [change, setChange] = useState('');
   const [list, setList] = useLocalStorage('costs', [], change);

   const [costs, setCosts] = useState([]);
   const [selectedPeriod, setSelectedPeriod] = useState([now, now]);

   const [infoVisible, setInfoVisible] = useState(false);
   const [deleteVisible, setDeleteVisible] = useState(false);
   const [id, setId] = useState(0);
   const [type, setType] = useState('new');

   useEffect(() => {
      const filteredCosts = list.filter(item => {
         const itemDate = new Date(item.date);
         return itemDate >= selectedPeriod[0] && itemDate <= selectedPeriod[1];
      });
      setCosts(filteredCosts);
   }, [list, selectedPeriod, change]);

   return (
      <>
         <View style={styles.container}>
            <View style={styles.principal}>
               <PeriodSelector setSelection={setSelectedPeriod} />
               <CostList
                  navigation={navigation}
                  list={costs}
                  setVisible={setInfoVisible}
                  setId={setId}
                  setType={setType}
               />
            </View>
            <View style={styles.new}>
               <TouchableOpacity
                  onPress={() => {
                     setType('new');
                     setInfoVisible(true);
                  }}>
                  <CustomButton type={1} />
               </TouchableOpacity>
            </View>
         </View>
         <InfoCost
            navigation={navigation}
            type={type}
            list={list}
            setList={setList}
            id={id}
            setChange={setChange}
            visible={infoVisible}
            setVisible={setInfoVisible}
            setDeleteVisible={setDeleteVisible}
         />
         <DeleteCost
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
      principal: {
         width: '100%',
         flex: 1,
         justifyContent: 'flex-start',
         alignItems: 'center',
         marginVertical: spacing.s,
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

export default Costs;
