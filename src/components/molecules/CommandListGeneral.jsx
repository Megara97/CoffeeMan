import {StyleSheet, View, FlatList} from 'react-native';
import Item from '../atoms/CommandItemGeneral';
import {typography, spacing, radius} from '../../styles/index';
import {useEffect, useState} from 'react';

const CommandList = ({navigation, list, paid = false}) => {
   const [commands, setCommands] = useState([]);

   useEffect(() => {
      if (paid === false) {
         setCommands(list.slice().reverse());
      } else {
         setCommands(list.sort((a, b) => new Date(b.date) - new Date(a.date)));
      }
   }, [list]);

   return (
      <View style={styles.container}>
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
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: spacing.s,
   },
});

export default CommandList;
