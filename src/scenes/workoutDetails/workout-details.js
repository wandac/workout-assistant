import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { getWorkoutByIdService } from '../../services';
import Constants from '../../utils/config';

const WorkoutDetailsScreen = ({route, navigation}) => {
    function processWorkoutByIdServiceResult(apiCallOutcome, responseJson) {
        switch(apiCallOutcome) {
    
          case Constants.RESPONSE_RECEIVED:
            break;
    
          case Constants.API_CALL_COMPLETED:
            break;
        }
      }

    if(route.params) {
        const { itemId } = route.params;
        const { itemTitle } = route.params;
        getWorkoutByIdService(itemId.id, processWorkoutByIdServiceResult);
    }

    return (
    <SafeAreaView>
       <Text>Screen: Workout details</Text>
    </SafeAreaView>
    )
};

export default WorkoutDetailsScreen;