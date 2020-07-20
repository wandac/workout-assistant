import React, { useState, useEffect } from 'react';
import { 
    Text,
    ActivityIndicator,
    StyleSheet,
    View,
    SectionList,
    TouchableOpacity,
    Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { 
    getWorkoutByIdService, 
} from '../../services';
import Constants from '../../utils/config';
import { Colors } from '../../styles';

const SEPARATOR = "+";

const Item = ({ text, navi }) => {
    const exerciseData = text.split(SEPARATOR);

    return (
        <TouchableOpacity style={styles.exerciseContainer} onPress = {() => {
            // navi.navigate(Constants.DETAILS_SCREEN);
        }}>
            <Ionicons name='ios-fitness' style={styles.exerciseImage} />
            <Text style={styles.exerciseName}>
                {exerciseData[0]}
                {"\n"}
                <Text style={styles.exerciseRepetitions}>{exerciseData[1]}</Text>
            </Text>
        </TouchableOpacity>
    );
}

const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
);

function Screen({data, navi, goal}) {
    return (
        <View>
            <Text style={styles.goal}>Goal: {goal}</Text>
            <SectionList
                sections={data}
                renderItem={({item}) => <Item text={item} navi={navi}/>}
                renderSectionHeader={({section}) => <SectionHeader title={section.title}/>}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

const WorkoutDetailsScreen = ({route, navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [goal, setGoal] = useState("");

    function processWorkoutByIdServiceResult(apiCallOutcome, responseJson) {
        switch(apiCallOutcome) {
    
            case Constants.RESPONSE_RECEIVED:
                var data = [];
                
                responseJson.day_list.forEach(day => {
                    let exercise = {};
                    exercise.title = day.days_of_week.text + " - " + day.obj.description;

                    exercise.data = [];
                    if(day.set_list[0]) {
                        day.set_list[0].exercise_list.forEach(currentExercise => {
                            exercise.data.push(currentExercise.obj.name + SEPARATOR + currentExercise.setting_text);
                        });
                    }
                    
                    data = [...data, exercise];
                });

                setGoal(responseJson.obj.comment);
                setData(data);
                break;
    
            case Constants.API_CALL_COMPLETED:
                setLoading(false);
                break;
        }
    }

    if(route.params) {
        const { itemId } = route.params;
        const { itemTitle } = route.params;
        
        useEffect(() => {
            getWorkoutByIdService(itemId.id, processWorkoutByIdServiceResult);
        }, []);
    }

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator/> : (
                <Screen data ={data} navi={navigation} goal={goal}/>
            )} 
        </View>
    )
};

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
    exerciseContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderColor: Colors.PRIMARY_COLOR,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
    },
    exerciseImage: {
        paddingLeft: 16,
        paddingRight: 8,
        fontSize:80,
        color: Colors.PRIMARY_COLOR,
    },
    exerciseName: {
        padding: 8,
        fontSize: 18,
        color: Colors.PRIMARY_COLOR,
    },
    exerciseRepetitions: {
        paddingRight: 8,
        paddingBottom: 8,
        fontSize: 12,
        color: Colors.PRIMARY_COLOR,
    },
    goal: {
        paddingTop: 4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 12,
        fontSize: 18,
        color: Colors.PRIMARY_COLOR,
        textTransform: 'uppercase'
    },
})

export default WorkoutDetailsScreen;