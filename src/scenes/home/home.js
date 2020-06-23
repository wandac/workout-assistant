import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { getWorkoutService } from '../../services';

const HomeScreen = ({navigation}) => {
    
    return (
    <SafeAreaView>
       <Text>Screen: Home</Text>
    </SafeAreaView>
    )
};

getWorkoutService();

export default HomeScreen;