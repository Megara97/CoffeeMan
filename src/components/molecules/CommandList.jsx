import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import colors from '../../assets/colors';
import {Shadow} from 'react-native-shadow-2';
import {useEffect, useState} from 'react';

const ShadowPresets = {
   general: {
      distance: 3,
      startColor: colors.typography + '15',
      endColor: colors.background,
      offset: [7, 10],
   },
};

const Item = ({navigation, client, subtotal, id}) => {
   const title = client === '' ? 'Comanda ' + id : client;
   return (
      <TouchableOpacity
         onPress={() => navigation.navigate('CommandDetails', {id: id})}>
         <Shadow {...ShadowPresets.general}>
            <View style={styles.item}>
               <Text style={styles.client}> {title} </Text>
               <Text style={styles.subtotal}>
                  {' '}
                  {subtotal !== null
                     ? `Subtotal: $ ${subtotal.toFixed(2)}`
                     : null}{' '}
               </Text>
            </View>
         </Shadow>
      </TouchableOpacity>
   );
};
// Subtotal: $ {subtotal.toFixed(2)}

const CommandList = ({navigation, list}) => {
   //console.log(list);
   return (
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
   );
};

const styles = StyleSheet.create({
   listContainer: {
      width: '100%', //'90%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
   },
   item: {
      //width: '100%',
      width: 350,
      height: 45,
      borderRadius: 17,
      backgroundColor: colors.gray2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //elevation: 3,
      paddingHorizontal: 20,
      marginVertical: 7,
      marginHorizontal: 5,
   },
   client: {
      fontSize: 15,
      fontFamily: 'Jaldi-Regular',
      color: colors.typography,
   },
   subtotal: {
      fontSize: 13,
      fontFamily: 'Jaldi-Regular',
      color: colors.mediumGray,
   },
});

export default CommandList;
