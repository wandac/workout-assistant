import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../../styles';

const SearchableList = props => {
    const [inputValue, onChangeText] = useState('');
    const [searchResult, setSearchResult] = useState(props.list);
    let data = props.list;

    const searchFilterFunction = text => {
        const newData = data.filter(item => {
            // const itemData = `${item.name.toUpperCase()} ${item.description.toUpperCase()}`;
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
    
            return itemData.indexOf(textData) > -1;
        });
        
        setSearchResult(newData);
    };

    const onInputTextChange = (text) => {
        onChangeText(text);
        searchFilterFunction(text)
    };

    const Item = ({ id, title, subtitle }) => {
        return (
            <TouchableOpacity
                onPress = {() => {
                    searchById(id);
                }}
                style = {styles.item}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        );
    }

    const  searchById = (id) => {
        hideSugestedSearchList();
        props.displaySearchResult(id);
    }

    function hideSugestedSearchList() {
        onChangeText("");
    }

    return(
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Ionicons name='ios-search' style={styles.searchIcon} />
                <TextInput 
                    style={styles.textInput}
                    onChangeText={text => onInputTextChange(text)}
                    value={inputValue}
                    placeholder="Search exercises"/>
            </View>

            {inputValue !== "" ?
                <FlatList 
                    style={styles.listContainer}
                    data={searchResult}
                    
                    renderItem={({ item }) => (
                        <Item
                            id = {item.id}
                            title = {item.name}
                            subtitle = {item.description}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                /> : null
            }
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
    },

    // search bar
    searchBarContainer: {
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
        color: Colors.PRIMARY_COLOR,
    },

    // search autocomplete list
    listContainer: {
        marginLeft: 52,
        marginRight: 8
    },
    item: {
        
    },
    title: {
        fontSize: 18,
        color: Colors.PRIMARY_COLOR
    }
});

export default SearchableList;