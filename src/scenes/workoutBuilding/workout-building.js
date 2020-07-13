import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  Text, 
  View, 
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
 } from 'react-native';
import Constants from 'expo-constants';

import AppConstants from '../../utils/config';
import { getWorkoutListService } from '../../services';
import { Colors } from '../../styles';

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress = {() => onSelect(id)}
      style = {[
        styles.item,
        { backgroundColor: selected ? 'tomato' : Colors.WHITE },
      ]}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
  );
}

const WorkoutBuildingScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );
  
  function processWorkoutServiceResult(apiCallOutcome, responseJson) {
    switch(apiCallOutcome) {

      case AppConstants.RESPONSE_RECEIVED:
        setData(responseJson.results);
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
              selected = {!!selected.get(item.id)}
              onSelect = {onSelect}
            />
          )}
          keyExtractor={item => item.id}
          extraData={selected}
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
    color: 'gray',
  },
});


export default WorkoutBuildingScreen;