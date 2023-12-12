import {StyleSheet, View, FlatList} from 'react-native';
import Item from '../atoms/CostItemGeneral';
import {typography, spacing, radius} from '../../styles/index';
import {useEffect, useState} from 'react';

const costList = ({navigation, list, setVisible, setId, setType}) => {
   const [costs, setCosts] = useState([]);

   useEffect(() => {
      setCosts(list.slice().reverse());
   }, [list]);

   return (
      <View style={styles.container}>
         <FlatList
            numColumns={1}
            data={costs}
            renderItem={({item}) => (
               <Item
                  navigation={navigation}
                  category={item.category}
                  amount={item.amount}
                  id={item.id}
                  setId={setId}
                  setVisible={setVisible}
                  setType={setType}
               />
            )}
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

export default costList;
