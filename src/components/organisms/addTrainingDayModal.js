import React, { useState } from 'react';
import { 
    Text,
    StyleSheet,
    View,
    Modal,
    TextInput,
    TouchableHighlight,
    Switch,
} from 'react-native';

import Constants from '../../utils/config';
import { Colors } from '../../styles';


const AddTrainingDayModal = ({isVisible, setVisible, callAddDayService}) => {
    const [isMondayEnabled, setMondayEnabled] = useState(false);
    const [isTuesdayEnabled, setTuesdayEnabled] = useState(false);
    const [isWednesdayEnabled, setWednesdayEnabled] = useState(false);
    const [isThursdayEnabled, setThursdayEnabled] = useState(false);
    const [isFridayEnabled, setFridayEnabled] = useState(false);
    const [isSaturdayEnabled, setSaturdayEnabled] = useState(false);
    const [isSundayEnabled, setSundayEnabled] = useState(false);
    const [inputValue, onChangeText] = useState('');
    const [showInputValidationError, setInputValidationErrorVisibility] = useState(false);
    const [showDayPickerValidationError, setDayPickerValidationErrorVisibility] = useState(false);

    const toggleMondaySwitch = () => setMondayEnabled(previousState => !previousState);
    const toggleTuesdaySwitch = () => setTuesdayEnabled(previousState => !previousState);
    const toggleWednesdaySwitch = () => setWednesdayEnabled(previousState => !previousState);
    const toggleThursdaySwitch = () => setThursdayEnabled(previousState => !previousState);
    const toggleFridaySwitch = () => setFridayEnabled(previousState => !previousState);
    const toggleSaturdaySwitch = () => setSaturdayEnabled(previousState => !previousState);
    const toggleSundaySwitch = () => setSundayEnabled(previousState => !previousState);

    function getSelectedDays() {
        let selectedDays = [];

        const DAY_SELECTION = [
            {
                day: 1,
                isSelected: isMondayEnabled,
            },
            {
                day: 2,
                isSelected: isTuesdayEnabled,
            },
            {
                day: 3,
                isSelected: isWednesdayEnabled,
            },
            {
                day: 4,
                isSelected: isThursdayEnabled,
            },
            {
                day: 5,
                isSelected: isFridayEnabled,
            },
            {
                day: 6,
                isSelected: isSaturdayEnabled,
            },
            {
                day: 7,
                isSelected: isSundayEnabled,
            },
        ];

        DAY_SELECTION.forEach(function(item) {
            if(item.isSelected) selectedDays.push(item.day);
        });

        return selectedDays;
    }

    function validateUserInput() {
        return validateDescription() && validateDaySelection();
    }

    function validateDescription() {
        const validInput = (inputValue !== "");

        !validInput ? setInputValidationErrorVisibility(true) : setInputValidationErrorVisibility(false);

        return validInput;
    }

    function validateDaySelection() {
        const validDaySelection = (getSelectedDays().length > 0);

        !validDaySelection ? setDayPickerValidationErrorVisibility(true) : setDayPickerValidationErrorVisibility(false);
        
        return validDaySelection;
    }

    function closeModal() {
        setInputValidationErrorVisibility(false);
        setDayPickerValidationErrorVisibility(false);
        setVisible(false);
        // TODO reset user input - day picker and description states
    }

    const DayPickerRow = ({day}) => {
        let toggleSwitch;
        let isEnabled;

        switch(day) {
            case Constants.MONDAY:
                toggleSwitch = toggleMondaySwitch;
                isEnabled = isMondayEnabled;
                break; 
            
            case Constants.TUESDAY:
                toggleSwitch = toggleTuesdaySwitch;
                isEnabled = isTuesdayEnabled;
                break;
            
            case Constants.WEDNESDAY:
                toggleSwitch = toggleWednesdaySwitch;
                isEnabled = isWednesdayEnabled;
                break; 
            
            case Constants.THURSDAY:
                toggleSwitch = toggleThursdaySwitch;
                isEnabled = isThursdayEnabled;
                break; 
            
            case Constants.FRIDAY:
                toggleSwitch = toggleFridaySwitch;
                isEnabled = isFridayEnabled;
                break;

            case Constants.SATURDAY:
                toggleSwitch = toggleSaturdaySwitch;
                isEnabled = isSaturdayEnabled;
                break; 
            
            case Constants.SUNDAY:
                toggleSwitch = toggleSundaySwitch;
                isEnabled = isSundayEnabled;
                break;  
        }

        return (
            <View style={styles.dayPicker}>
                <Switch
                    style={styles.switch}
                    trackColor={{ false: Colors.PRIMARY_COLOR, true: Colors.ACCENT_COLOR }}
                    thumbColor={"#f4f3f4"}
                    // ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text style={{...styles.textStyle, color:Colors.PRIMARY_COLOR}}>{day}</Text>
            </View>
        );
    }

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {}}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>  
                    {showInputValidationError ? <Text style={{...styles.textStyle, color: Colors.ACCENT_COLOR}}>What is done on this day?{'\n'}What body parts are trained?</Text> : (null)}
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={inputValue}
                        onChangeText={text => onChangeText(text)}/>

                    {showDayPickerValidationError ? <Text style={{...styles.textStyle, color: Colors.ACCENT_COLOR}}>Select at least one day</Text> : (null)}

                    <DayPickerRow day={Constants.MONDAY}/>
                    <DayPickerRow day={Constants.TUESDAY}/>
                    <DayPickerRow day={Constants.WEDNESDAY}/>
                    <DayPickerRow day={Constants.THURSDAY}/>
                    <DayPickerRow day={Constants.FRIDAY}/>
                    <DayPickerRow day={Constants.SATURDAY}/>
                    <DayPickerRow day={Constants.SUNDAY}/>

                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            style={styles.submitButton}
                            onPress={() => {
                                if(validateUserInput()) {
                                    closeModal();
                                    callAddDayService(inputValue, getSelectedDays());
                                }
                            }}>
                            <Text style={styles.textStyle}>Add workout day</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{...styles.submitButton, backgroundColor: Colors.PRIMARY_COLOR}}
                            onPress={() => {
                                closeModal();
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
    dayPicker: {
        flexDirection: 'row',
        marginLeft: 10, 
        marginRight: 10, 
        marginBottom: 10,
        alignItems: "center",
    },
    switch: {
        marginRight: 4,
    },
});

export default AddTrainingDayModal;