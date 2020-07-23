import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  Text, 
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import AppConstants from '../../utils/config';
import { getWorkoutListService, workoutService} from '../../services';
import { Colors } from '../../styles';
import Constants from '../../utils/config';

function Item({ id, title, creationDate, navi }) {
  return (
    <TouchableOpacity
      onPress = {() => {
        navi.navigate(AppConstants.WORKOUT_DETAILS_SCREEN, {
          itemId: {id},
          itemTitle: title,
        });
      }}
      style = {[
        styles.item,
        { backgroundColor: Colors.WHITE },
      ]}>
      <Text style={styles.title}>{title != "" ? title : "Workout (" + creationDate + ")"}</Text>
    </TouchableOpacity>
  );
}

const WorkoutBuildingLayout = ({data, navigation}) => (
  <View>
    <FlatList
      data={data}
          
      renderItem={({ item }) => (
        <Item
          id = {item.id}
          title = {item.comment}
          creationDate = {item.creation_date}
          navi = {navigation}
       />
      )}
      keyExtractor={item => item.id.toString()}
    />
    <TouchableOpacity 
      onPress = {() => {
          console.log("fab pressed");
          const request = {
            url: Constants.WGER_API_PATH + Constants.WGER_WORKOUT_ENDPOINT, 
            method: 'POST', 
            body: '{"comment": "bar"}',
            headers: {
              foo: 'bar'
            }
          };
          workoutService(request, processWorkoutServiceResponse);
        }
      }
      style = {styles.fabBackground}>
      <Ionicons name='ios-add' style={styles.fabIcon} />
    </TouchableOpacity>
  </View> 
);

function processWorkoutServiceResponse(apiCallOutcome, responseJson) {
  switch(apiCallOutcome) {

    case AppConstants.RESPONSE_RECEIVED:
      console.log("RESPONSE_RECEIVED");
      break;

    case AppConstants.API_CALL_COMPLETED:
      console.log("API_CALL_COMPLETED");
      break;
  }
}

const WorkoutBuildingScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function processWorkoutServiceResult(apiCallOutcome, responseJson) {
    switch(apiCallOutcome) {

      case AppConstants.RESPONSE_RECEIVED:
        setData(responseJson);
        break;

      case AppConstants.API_CALL_COMPLETED:
        setLoading(false);
        break;
    }
  }

  useEffect(() => {
    getWorkoutListService(processWorkoutServiceResult);
  }, []);
  
  return(
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <WorkoutBuildingLayout data={data} navigation={navigation}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  item: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: Colors.PRIMARY_COLOR,
  },
  screensContainer:{
    maxHeight: '100vh'
  },
  fabBackground: {
    position: "absolute",
    right: 20,
    top: 20,
    width: 56,
    height: 56,
    backgroundColor: Colors.ACCENT_COLOR,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabIcon: {
    color: Colors.WHITE,
    fontSize: 54,
  }
});

export default WorkoutBuildingScreen;