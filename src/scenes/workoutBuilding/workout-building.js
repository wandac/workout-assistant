import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  Text, 
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';

import AppConstants from '../../utils/config';
import { getWorkoutListService } from '../../services';
import { Colors } from '../../styles';

function Item({ id, title, navi }) {
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
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
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
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          
          renderItem={({ item }) => (
            <Item
              id = {item.id}
              title = {item.comment}
              navi = {navigation}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
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
});

export default WorkoutBuildingScreen;