import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { connect } from 'react-redux';

import { Colors } from '../../styles';
import SearchableList from '../../components/organisms/searchableList';

class SearchScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SearchableList list = {this.props.wgerExercises.exercises}/>
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