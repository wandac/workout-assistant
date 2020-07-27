import React from "react";
import { 
    SectionList, 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Linking,
} from 'react-native';

import { Colors } from '../../styles';

const Item = ({ text, navi }) => (
    <TouchableOpacity onPress = {() => {
        let url = JSON.parse(text).url;
        if(url != "") {
            Linking.openURL(url);
        } else {
            console.log("navigation to be implemented");
        }
        }}>
        {JSON.parse(text).title === "" ? 
            <Text style={styles.item}>{JSON.parse(text).text}</Text> : 
            <Text style={styles.item}>
                <Text style={{...styles.item, color: Colors.ACCENT_COLOR}}>{JSON.parse(text).title + ": "}</Text>
                {JSON.parse(text).text}
            </Text>}
    </TouchableOpacity>
);

const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
);

const ThemedSectionList = ({data, navigation}) => {
    return (
        <View style={styles.container}>
            <SectionList
                sections={data}
                renderItem={({item}) => <Item text={item} navi={navigation}/>}
                renderSectionHeader={({section}) => <SectionHeader title={section.title}/>}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: Colors.WHITE,
    },
    sectionHeader: {
        paddingTop: 4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 4,
        fontSize: 10,
        color: Colors.ACCENT_COLOR,
        textTransform: 'uppercase'
    },
    item: {
        padding: 8,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        fontSize: 18,
        minHeight: 44,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.PRIMARY_COLOR,
        borderWidth: 1,
        borderRadius: 8,
        color: Colors.PRIMARY_COLOR,
    },
})

export default ThemedSectionList;