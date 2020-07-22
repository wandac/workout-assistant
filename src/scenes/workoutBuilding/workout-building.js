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
import { getWorkoutListService } from '../../services';
import { Colors } from '../../styles';

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
    <TouchableOpacity style={styles.fabBackground}>
      <Ionicons name='ios-add' style={styles.fabIcon} />
    </TouchableOpacity>
  </View> 
);

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
  fabBackground: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    backgroundColor: Colors.ACCENT_COLOR,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: "#000",
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