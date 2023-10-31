import {StyleSheet, View, FlatList} from 'react-native';
import Item from '../atoms/CommandItemGeneral';
import {typography, spacing, radius} from '../../styles/index';
import {useEffect, useState} from 'react';

const CommandList = ({navigation, list, paid = false}) => {
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
               renderItem={({item}) =>
                  paid ? (
                     <Item
                        navigation={navigation}
                        client={item.client}
                        subtotal={item.subtotal}
                        id={item.id}
                        date={item.date}
                        paid
                     />
                  ) : (
                     <Item
                        navigation={navigation}
                        client={item.client}
                        subtotal={item.subtotal}
                        id={item.id}
                     />
                  )
               }
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

export default CommandList;
