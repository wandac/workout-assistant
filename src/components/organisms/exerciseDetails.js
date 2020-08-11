import React from 'react';
import { 
    Text,
    View,
    StyleSheet
 } from 'react-native';

 import { Colors } from '../../styles';

const TextRow = ({keyText, valueText}) => {
    return(
        <View style={styles.rowContainer}>
            <Text style={{...styles.textStyle, flex:1}}>{keyText}</Text>
            <Text style={{...styles.textStyle, flex:3}}>{valueText}</Text>
        </View>
    );
}

const ExerciseDetails = ({data}) => {
    return(
        <View>
            <TextRow keyText={"Exercise: "} valueText={data.name}/>
            <TextRow keyText={"Category: "} valueText={data.category}/>
            <TextRow keyText={"Equipment: "} valueText={data.equipment}/>
            <TextRow keyText={"Description: "} valueText={data.description}/>
            <TextRow keyText={"Muscles: "} valueText={data.muscles}/>
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
    }, 
    textStyle: {
        color: Colors.PRIMARY_COLOR,
    },
});

export default ExerciseDetails;