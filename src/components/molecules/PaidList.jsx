import {StyleSheet, View, FlatList} from 'react-native';
import Item from './PaidItem';
import {typography, spacing, radius} from '../../styles/index';
import {useEffect, useState} from 'react';

const PaidList = ({navigation, list}) => {
   //console.log(list);
   const [commands, setCommands] = useState([]);

   useEffect(() => {
      setCommands(list.slice().reverse());
   }, [list]);

   return (
      <View style={styles.container}>
         <View style={styles.listContainer}>
            <FlatList
               numColumns={1}
               data={commands}
               renderItem={({item}) => (
                  <Item
                     navigation={navigation}
                     title={item.date}
                     subtotal={item.subtotal}
                     id={item.id}
                  />
               )}
               keyExtractor={item => item.id}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: spacing.s,
   },
   listContainer: {
      width: '90%',
      height: '100%',
   },
});

export default PaidList;
