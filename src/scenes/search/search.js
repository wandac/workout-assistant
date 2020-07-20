import React from 'react';
import {
    Text, 
    StyleSheet,
    View,
    TextInput,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../../styles';

const SearchBar = () => {
    const [value, onChangeText] = React.useState('Search');

    return (
        <View style={styles.searchBarContainer}>
            <Ionicons name='ios-search' style={styles.searchIcon} />
            <TextInput 
                style={styles.textInput}
                onChangeText={text => onChangeText(text)}
                value={value}/>
        </View>
    );
}

const SearchScreen = ({navigation}) => (
    <View style={styles.container}>
        <SearchBar/>
    </View>
);

const styles = StyleSheet.create ({
    container: {
        backgroundColor: Colors.WHITE,
        paddingTop: 20,
        flex: 1,
    },
    searchBarContainer: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        minHeight: 44,
        borderColor: Colors.PRIMARY_COLOR,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection:'row',
        alignItems: 'center',
    },
    searchIcon: {
        fontSize: 24,
        padding: 8,
        marginLeft: 8,
        marginRight: 8,
        color: Colors.PRIMARY_COLOR,
    },
    textInput: {
        fontSize: 18,
        color: 'lightgray',
    }
});
export default SearchScreen;