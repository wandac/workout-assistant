import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { connect } from 'react-redux';

import { Colors } from '../../styles';
import SearchableList from '../../components/organisms/searchableList';
import ExerciseDetails from '../../components/organisms/exerciseDetails';

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearchResultVisible: false,
            searchId: 0
        };
    }

    displaySearchResult(id) {
        console.log("displaySearchResult ", id);
        this.setSearchResultVisibility(true);
        this.setSearchId(id);
    }

    setSearchResultVisibility(visivility) {
        this.setState({
            isSearchResultVisible: visivility
        });
    }

    setSearchId = (id) => {
        this.setState({
            searchId: id
        });
    }

    getExerciseDetails() {
        let id = this.state.searchId;
        let selectedExercise = this.props.wgerExercises.exercises[0];

        this.props.wgerExercises.exercises.forEach(exercise => {
            if(exercise.id === id) {
                selectedExercise = exercise;
            }
        });

        return  selectedExercise;
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchableList 
                    list = {this.props.wgerExercises.exercises}
                    displaySearchResult = {(id) => this.displaySearchResult(id)}/>
                
                {this.state.isSearchResultVisible ? <ExerciseDetails data={this.getExerciseDetails()}/> : null}
            </View>
        );
    }
};

const styles = StyleSheet.create ({
    container: {
        backgroundColor: Colors.WHITE,
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16,
        flex: 1,
    }
});

const mapStateToProps = state => {
    return {
        wgerExercises: state
    };
}

export default connect(mapStateToProps, null)(SearchScreen);