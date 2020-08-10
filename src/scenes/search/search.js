import React, { Component, useState } from 'react';
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
        this.state = {isSearchResultVisible: false};
    }

    displaySearchResult(id) {
        console.log("displaySearchResult ", id);
        this.setSearchResultVisibility(true);
    }

    setSearchResultVisibility(visivility) {
        this.setState({
            isSearchResultVisible: visivility
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchableList 
                    list = {this.props.wgerExercises.exercises}
                    displaySearchResult = {(id) => this.displaySearchResult(id)}/>
                
                {this.state.isSearchResultVisible ? <ExerciseDetails/> : null}
            </View>
        );
    }
};

const styles = StyleSheet.create ({
    container: {
        backgroundColor: Colors.WHITE,
        paddingTop: 20,
        flex: 1,
    }
});

const mapStateToProps = state => {
    return {
        wgerExercises: state
    };
}

export default connect(mapStateToProps, null)(SearchScreen);