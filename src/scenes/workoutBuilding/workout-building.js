import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  Text, 
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  TouchableHighlight,
  TextInput,
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

const WorkoutBuildingScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, onChangeText] = useState('Workout name');
  const [isWorkoutPlanEmpty, setWorkoutPlanEmpty] = useState(false);
  const [newWorkoutId, setNewWorkoutId] = useState("");

  function processWorkoutServiceResult(apiCallOutcome, responseJson) {
    switch(apiCallOutcome) {

      case AppConstants.RESPONSE_RECEIVED:
        (Array.isArray(responseJson) && responseJson.length) ? setData(responseJson) : setWorkoutPlanEmpty(true);
        break;

      case AppConstants.API_CALL_COMPLETED:
        setLoading(false);
        break;
    }
  }

  function callWorkoutService(workoutName) {
    console.log(workoutName);
    setLoading(true);
  
    const request = {
      url: Constants.WGER_API_PATH + Constants.WGER_WORKOUT_ENDPOINT, 
      method: 'POST', 
      body: '{"comment": "<workout_name>"}'.replace("<workout_name>", workoutName),
    };
    workoutService(request, processWorkoutServiceResponse);
  }

  function processWorkoutServiceResponse(apiCallOutcome, responseJson) {
    switch(apiCallOutcome) {
  
      case AppConstants.RESPONSE_RECEIVED:
        setNewWorkoutId(responseJson.id);
        break;
  
      case AppConstants.API_CALL_COMPLETED:
        setLoading(false);
        break;
    }
  }

  useEffect(() => {
    getWorkoutListService(processWorkoutServiceResult);
  }, [newWorkoutId]);
  
  return(
    <View style={styles.container}>
      {isWorkoutPlanEmpty ? 
        <Text style={styles.emptyStateText}>
          Dear Fat,{"\n"}Prepare to die.{"\n"}
          <Text style={{...styles.emptyStateText, color: Colors.ACCENT_COLOR}}>xo,</Text>
          {"\n"}Me{"\n"}
        </Text> : null}

      {isLoading ? <ActivityIndicator size="large" color={Colors.ACCENT_COLOR}/> : (
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
      )}

      <TouchableOpacity 
        onPress = {() => {
            setModalVisible(true);
          }
        }
        style = {styles.fabBackground}>
        <Ionicons name='ios-add' style={styles.fabIcon} />
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>  

            <TextInput
              style={styles.input}
              onChangeText={text => onChangeText(text)}
              value={value}/>

            <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.submitButton}
              onPress={() => {
                callWorkoutService(value);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Add workout</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={{...styles.submitButton, backgroundColor: Colors.PRIMARY_COLOR}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  emptyStateText: {
    marginTop: 100,
    backgroundColor: Colors.WHITE,
    alignSelf: "center",
    borderColor: Colors.PRIMARY_COLOR,
    color: Colors.PRIMARY_COLOR,
    borderWidth: 2,
    padding: 20,
  },

  // list item 
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

  // fab
  fabBackground: {
    position: "absolute",
    right: 20,
    bottom: 20,
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
  },

  // popup
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 32,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: { 
    minHeight: 40, 
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
    borderColor: Colors.PRIMARY_COLOR, 
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  submitButton: {
    backgroundColor: Colors.ACCENT_COLOR,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 10,
    marginLeft: 10,
  },
  textStyle: {
    color: Colors.WHITE,
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default WorkoutBuildingScreen;