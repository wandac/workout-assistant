import React, { Component } from 'react';
import { 
    Text,
    StyleSheet,
    View,
    Picker,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import SearchableList from '../../components/organisms/searchableList';
import { Colors } from '../../styles';
import { SubmitButton } from '../../components/molecules';

const RemovableExerciseButton = ({title, deleteExercise}) => {
    return (
        <TouchableOpacity 
            style={styles.removableButton}
            onPress = {() => {
                deleteExercise(title);
            }}>
            <Image source={require('../../assets/images/baseline_delete_white_24dp.png')} style={styles.imageIconStyle}/>
            <Text style={[styles.text, styles.bigFont]}>{title}</Text>
        </TouchableOpacity>
    );
}

RemovableExerciseButton.propTypes = {
    title: PropTypes.string,
    deleteExercise: PropTypes.func
};

const RepetitionsRow = ({runningNumber}) => {
    return (
        <View style={styles.exerciseRepetitionRow}>
            <Text style={styles.text}>{runningNumber}</Text>
            <TextInput
                style={styles.amountOfRepetitionsInput}
                keyboardType="numeric"
                placeholder="amount"/>

            <Picker
                style={[styles.picker, styles.flex1]}
                mode="dialog"> 
                    <Picker.Item label="Repetitions" value="Repetitions" color={Colors.PRIMARY_COLOR}/>
            </Picker> 
        </View>
    );
}

RepetitionsRow.propTypes = {
    runningNumber: PropTypes.string
};

const ExerciseFormItem = ({data, title}) => {
    return(
        <View style={styles.exerciseFormItemContainer}>
            <Text style={[styles.text, styles.accentColor]}>{title}</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <RepetitionsRow runningNumber={item.runningNumber}/>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

ExerciseFormItem.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string
};

class WorkoutAddExerciseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noOfSets: "1",
            setFormData: [{
                id: "id0",
                runningNumber: "1."
            }],
            searchResultData: []
          };
    }

    displaySearchResult(id) {
        let exercises = this.props.wgerExercises.exercises;
        var result = exercises.filter(exercise => {
            return exercise.id === id
        });

        this.setState(() => {
            const searchResultData = [...this.state.searchResultData, result[0]];
        
            return {
                searchResultData,
            };
        }); 
    }

    deleteExercise(title) {
        let item = {};
        item = this.state.searchResultData.filter(exercise => {
            return exercise.name === title
        });
    
        var data = [...this.state.searchResultData];
        var index = data.indexOf(item[0])
        
        if (index !== -1) {
            data.splice(index, 1);
            this.setState({searchResultData: data});
        }
    }

    setDataForSetForm(repetitions) {
        let data = [];
        let obj= {};
        for(let i=0; i<repetitions; i++) {
            obj = {
                id: "id" + i,
                runningNumber: (i+1) + "."
            };
            data.push(obj);
        }
        this.setState({setFormData: data});
    }

    handleOnPress() {
        // TBD
        // validate form
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Exercises</Text>
                <SearchableList 
                    list = {this.props.wgerExercises.exercises}
                    displaySearchResult = {(id) => this.displaySearchResult(id)}/>

                {this.state.searchResultData.length ?
                <View>
                    <FlatList
                        data={this.state.searchResultData}
                        renderItem={({ item }) => (
                            <RemovableExerciseButton 
                                title={item.name} 
                                deleteExercise={(title) => {this.deleteExercise(title)}}/>
                        )}
                        keyExtractor={item => item.uuid.toString()}/> 

                    <Text style={styles.text}>Number of sets</Text>
                
                    <TouchableOpacity style={styles.pickerContainer}>
                        <Picker
                            selectedValue={this.state.noOfSets}
                            style={styles.picker}
                            mode="dialog"
                            onValueChange={
                                (itemValue) => {
                                    this.setState({noOfSets: itemValue});  
                                    this.setDataForSetForm(itemValue);
                                }
                            }> 
                                <Picker.Item label="1" value="1" color={Colors.PRIMARY_COLOR}/>
                                <Picker.Item label="2" value="2" color={Colors.PRIMARY_COLOR}/>
                                <Picker.Item label="3" value="3" color={Colors.PRIMARY_COLOR}/>
                                <Picker.Item label="4" value="4" color={Colors.PRIMARY_COLOR}/>
                                <Picker.Item label="5" value="5" color={Colors.PRIMARY_COLOR}/>
                                <Picker.Item label="6" value="6" color={Colors.PRIMARY_COLOR}/>
                                <Picker.Item label="7" value="7" color={Colors.PRIMARY_COLOR}/>
                                <Picker.Item label="8" value="8" color={Colors.PRIMARY_COLOR}/>
                                <Picker.Item label="9" value="9" color={Colors.PRIMARY_COLOR}/>
                                <Picker.Item label="10" value="10" color={Colors.PRIMARY_COLOR}/>
                        </Picker> 
                    </TouchableOpacity>

                    <FlatList
                        data={this.state.searchResultData}
                        renderItem={({ item }) => (
                            <ExerciseFormItem 
                                data={this.state.setFormData} 
                                title={item.name}/>
                        )}
                        keyExtractor={item => item.uuid.toString()}/>

                    <SubmitButton 
                        title="Save"
                        handleOnPress={() => {this.handleOnPress()}}/>
                </View>
                : null}
            </ScrollView>
        );
    }
}

WorkoutAddExerciseScreen.propTypes = {
    wgerExercises: PropTypes.object,
};

const styles = StyleSheet.create ({
    container: {
        backgroundColor: Colors.WHITE,
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16,
        flex: 1,
    },
    // section label
    text: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 10,
        textTransform: 'uppercase'
    },
    // removable buttons
    removableButton: {
        flexDirection: 'row',
        backgroundColor: Colors.SECONDARY_COLOR,
        borderRadius: 8,
        marginBottom: 8,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageIconStyle: {
        height: 24,
        width: 24,
        tintColor: Colors.PRIMARY_COLOR,
        marginRight: 20,
    },
    // no of sets picker
    pickerContainer: {
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 8,
        marginTop: 8,
        marginBottom: 8,
        borderWidth: 1
    },
    picker: {
        color: Colors.PRIMARY_COLOR,
        height: 44,
        marginLeft: 8,
    },
    // exercise form
    exerciseRepetitionRow: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 8
    },
    amountOfRepetitionsInput: {
        height: 44, 
        borderColor: Colors.PRIMARY_COLOR, 
        borderWidth: 1, 
        flex: 1, 
        paddingLeft: 16, 
        borderRadius: 8, 
        marginRight: 16, 
        marginLeft: 16
    },
    flex1: {
        flex: 1
    },
    exerciseFormItemContainer: {
        marginBottom: 8
    },
    accentColor: {
        color: Colors.ACCENT_COLOR
    },
    bigFont: {
        fontSize: 18,
    }
});

const mapStateToProps = state => {
    return {
        wgerExercises: state
    };
}

export default connect(mapStateToProps, null)(WorkoutAddExerciseScreen);