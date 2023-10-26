import {StyleSheet, View, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Item from './DetailsItem';
import {typography, spacing, radius} from '../../styles/index';

const DetailsList = ({navigation, id, list, setChange}) => {
   const colors = useTheme().colors;
   const styles = ComponentStyle(colors);

   //console.log('Productos de la comanda:', list);
   return (
      <View style={styles.container}>
         <View style={styles.listContainer}>
            <FlatList
               numColumns={1}
               data={list}
               keyExtractor={item => item.product}
               renderItem={({item}) => (
                  <Item
                     navigation={navigation}
                     product={item.product}
                     number={item.quantity}
                     subtotal={item.price}
                     setChange={setChange}
                     id={id}
                  />
               )}
            />
         </View>
      </View>
   );
};

const ComponentStyle = colors => {
   return StyleSheet.create({
      container: {
         width: '100%',
         flex: 1,
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'flex-start',
         paddingVertical: spacing.xs,
      },
      listContainer: {
         width: '90%',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors.secondary,
         borderRadius: radius.s,
      },
   });
};

export default DetailsList;
