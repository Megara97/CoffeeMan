import {TextInput, View, StyleSheet} from 'react-native';
import {useEffect} from 'react';
import SearchIcon from '../../assets/icons/search.svg';
import colors from '../../assets/colors';
import {useTheme} from '@react-navigation/native';

const Search = ({_onChangeText, textToSearch, data, _setDataSort}) => {
   const colors = useTheme().colors;
   const styles = StyleSheet.create({
      listSearchContainer: {
         width: '70%',
         height: 30,
         backgroundColor: colors.gray2,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         borderRadius: 7,
         paddingHorizontal: 20,
      },
      input: {
         width: '90%',
         paddingVertical: 0,
         height: '100%',
         fontFamily: 'Jaldi-Regular',
         fontSize: 13,
         color: colors.typography,
      },
   });

   const sortData = () => {
      let listFilter = []; //Lista donde se guardan las coincidencias
      data.forEach(e => {
         var re = new RegExp(textToSearch, 'gi');
         //RegExp es un objeto que representa una expresión regular
         // RegExp es un constructor, y cuando se utiliza new, se crea una nueva instancia de la clase RegExp
         //Las expresiones regulares son patrones utilizados para realizar búsquedas y manipulaciones en string.
         // Indicadores o flags: g-global e i-insensitive

         //metodo test de RegExp busca coincidencias en el string e indica si se encontraron o no
         //metodo match ademas devuele un array con las coincidencias encontradas
         if (re.test(e.product)) {
            listFilter.push(e);
         }
      });
      _setDataSort(listFilter);
   };
   useEffect(() => {
      sortData();
   }, [textToSearch]);

   return (
      <View style={styles.listSearchContainer}>
         <TextInput
            style={styles.input}
            placeholder="Buscar productos"
            placeholderTextColor={colors.mediumGray}
            onChangeText={_onChangeText}
            value={textToSearch}
         />
         <SearchIcon width={20} height={20} fill={colors.typography} />
      </View>
   );
};

export default Search;
