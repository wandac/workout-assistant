import React, { Component } from 'react';
import { 
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    Picker,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { connect } from 'react-redux';

import SearchableList from '../../components/organisms/searchableList';
import { Colors } from '../../styles';

class WorkoutAddExerciseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noOfSets: "4",
            searchResultData: []
          };
    }

    Item = ({title}) => {
        return (
            <TouchableOpacity onPress={this.deteteExercise()} style={styles.item}>
                <Image source={require('../../assets/images/baseline_delete_white_24dp.png')} style={styles.imageIconStyle}/>
                <Text style={{...styles.text, fontSize: 18}}>{title}</Text>
            </TouchableOpacity>
        );
    }

    displaySearchResult(id) {
        let exercises = this.props.wgerExercises.exercises;
        var result = exercises.filter(exercise => {
            return exercise.id === id
        });

        this.setState(state => {
            const searchResultData = [...this.state.searchResultData, result[0]];
        
            return {
                searchResultData,
            };
        }); 
    }

    deteteExercise() {
        console.log("delete");
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Exercises</Text>
                <SearchableList 
                    list = {this.props.wgerExercises.exercises}
                    displaySearchResult = {(id) => this.displaySearchResult(id)}/>

                {this.state.searchResultData.length ?
                    <FlatList
                        data={this.state.searchResultData}
                        renderItem={({ item }) => (
                            <this.Item title={item.name}/>
                        )}
                        keyExtractor={item => item.id.toString()}
                    /> : 
                    null 
                }

                <Text style={styles.text}>Number of sets</Text>
                
                <TouchableOpacity style={styles.pickerContainer}>
                    <Picker
                        selectedValue={this.state.noOfSets}
                        style={styles.picker}
                        mode="dialog"
                        onValueChange={
                            (itemValue, itemIndex) => this.setState({noOfSets: itemValue})
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
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: Colors.WHITE,
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16,
        flex: 1
    },
    // section label
    text: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 10,
        textTransform: 'uppercase'
    },
    // removable buttons
    item: {
        flexDirection: 'row',
        backgroundColor: '#DCDCDC',
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
        borderWidth: 1
    },
    picker: {
        color: Colors.PRIMARY_COLOR,
        height: 44,
        marginLeft: 8,
    },
});

const mapStateToProps = state => {
    return {
        wgerExercises: state
    };
}

export default connect(mapStateToProps, null)(WorkoutAddExerciseScreen);