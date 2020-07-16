import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const WorkoutDetailsScreen = ({route, navigation}) => {
    if(route.params) {
        const { itemId } = route.params;
        const { itemTitle } = route.params;
        console.log(JSON.stringify(itemId));
        console.log(JSON.stringify(itemTitle));
    }

    return (
    <SafeAreaView>
       <Text>Screen: Workout details</Text>
    </SafeAreaView>
    )
};

export default WorkoutDetailsScreen;