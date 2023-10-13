import React from 'react';
import {View} from 'react-native';
import SideMenu from '../components/molecules/SideMenu';

const Home = ({navigation , route}) => {
    return (
        <View>
          <SideMenu navigation={navigation}/>
        </View>
    );
};

export default Home;