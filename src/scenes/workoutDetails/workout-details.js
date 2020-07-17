import React, { useState, useEffect } from 'react';
import { 
    Text,
    ActivityIndicator,
    StyleSheet,
    View,
    SectionList,
    TouchableOpacity,
} from 'react-native';

import { getWorkoutByIdService } from '../../services';
import Constants from '../../utils/config';
import { Colors } from '../../styles';

const Item = ({ text, navi }) => (
    <TouchableOpacity onPress = {() => {
        // navi.navigate(Constants.DETAILS_SCREEN);
    }}>
        <Text style={styles.item}>{text}</Text>
    </TouchableOpacity>
);

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
                            exercise.data.push(currentExercise.obj.name + " " + currentExercise.setting_text);
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