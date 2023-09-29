import React from 'react';
import {Text, View, Button} from 'react-native';

const CommandDetails = ({navigation , route}) => {
  return (
    <View>
      <Text> Comanda {route.params.id}  </Text>
        <Button 
          title={`Pagar comanda ${route.params.id}`}
          onPress={() => navigation.navigate('Pay')} 
        />
      </View>
  );  
};

export default CommandDetails;