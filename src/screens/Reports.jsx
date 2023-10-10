import React from 'react';
import {Text, View} from 'react-native';
import DetailsList from '../components/molecules/DetailsList';

const Reports = ({navigation , route}) => {
    return (
        <View>
          <Text>Reportes</Text>
          <DetailsList navigation={navigation}/>
        </View>
    );  
};

export default Reports;