import React, { useState } from 'react';
import { 
  Text, 
  View,
  Modal,
  TouchableHighlight,
  TextInput,
  StyleSheet,
} from 'react-native';

import { Colors } from '../../styles';

const AddWorkoutModal = ({isVisible, setVisible, callWorkoutService}) => {
    const [value, onChangeText] = useState('Workout name');

    function close() {
        setVisible(false);
    }

    return(
      <Modal
        animationType="none"
        transparent={true}
        visible={isVisible}
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
                // TODO: input validation
                callWorkoutService(value);
                close();
              }}>
              <Text style={styles.textStyle}>Add workout</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={{...styles.submitButton, backgroundColor: Colors.PRIMARY_COLOR}}
              onPress={() => {
                close();
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
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

export default AddWorkoutModal;