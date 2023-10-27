import {StyleSheet, View, FlatList} from 'react-native';
import Item from './CommandItem';
import {typography, spacing, radius} from '../../styles/index';

const CommandList = ({navigation, list}) => {
   //console.log(list);
   return (
      <View style={styles.container}>
         <View style={styles.listContainer}>
            <FlatList
               numColumns={1}
               data={list}
               renderItem={({item}) => (
                  <Item
                     navigation={navigation}
                     client={item.client}
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

export default CommandList;
