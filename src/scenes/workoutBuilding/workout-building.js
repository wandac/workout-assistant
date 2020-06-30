import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';

import Constants from '../../utils/config';

const WorkoutBuildingScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(Constants.WGER_API_PATH + Constants.WGER_WORKOUT_ENDPOINT, {
      method: 'GET',
      headers: {"Authorization": "Token " + Constants.WGER_API_KEY}
    })
    .then((response) => response.json())
    .then((json) => {
      setData(json.results);
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);
  
  return(
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.comment}, {item.creation_date}</Text>
          )}
        />
      )}
    </View>
  );
}

export default WorkoutBuildingScreen;