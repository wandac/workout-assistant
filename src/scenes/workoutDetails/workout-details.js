import React, { useState, useEffect, useContext } from 'react';
import { 
    Text,
    ActivityIndicator,
    StyleSheet,
    View,
    SectionList,
    TouchableOpacity,
    Button,
    SafeAreaView
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { 
    getWorkoutByIdService, 
    dayService,
    setService
} from '../../services';
import Constants from '../../utils/config';
import { Colors } from '../../styles';
import { HeaderButton } from '../../components/molecules';
import { AddTrainingDayModal } from '../../components/organisms';

const SEPARATOR = "+";

function Screen({data, navi, goal}) {
    return (
        <View>
            <Text style={styles.goal}>Goal: {goal}</Text>
            <SectionList
                style={styles.listContainer}
                sections={data}
                renderItem={({item}) => <Item text={item} navi={navi}/>}
                renderSectionHeader={({section}) => <SectionHeader title={section.title.split(SEPARATOR)[0]}/>}
                keyExtractor={(item, index) => index}
                renderSectionFooter={({section}) => {
                    return(<Button 
                        title="Add exercises to this workout day" 
                        onPress={()=>{handleSectionFooterSelection(section, navi);}}
                        color={Colors.PRIMARY_COLOR}
                        />);}}
            />
        </View>
    );
}

function handleSectionFooterSelection(section, navi) {
    const exerciseday = section.title.split(SEPARATOR)[1];
    const order = section.data.length + 1;

    console.log("handleSectionFooterSelection", "exerciseday: ", exerciseday, "order: " + order);
    callSetService(order, exerciseday);
    navi.navigate(Constants.WORKOUT_ADD_EXERCISE_SCREEN);
}

function callSetService(order, exerciseday) {
    // setLoading(true);

    const body = {
        "order": order,
        "sets": null, // user input
        "exerciseday": exerciseday,
        "exercises": [] // user input
    };

    console.log(body);

    const request = {
        url: Constants.WGER_API_PATH + Constants.WGER_SET_ENDPOINT, 
        method: 'POST', 
        body: JSON.stringify(body),
    };

    // setService(request, processSetServiceResponse);
}

function processSetServiceResponse() {
    // TBD
}

const Item = ({ text, navi }) => {
    const exerciseData = text.split(SEPARATOR);

    return (
        <TouchableOpacity style={styles.exerciseContainer} onPress = {() => {}}>
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

const WorkoutDetailsScreen = ({route, navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [goal, setGoal] = useState("");
    const [showAddTrainingIcon, setAddTrainingIconVisibility] = useState(false);
    const [displayAddTrainingDayModal, setAddTrainingDayModalVisibility] = useState(false);
    const [newTrainingDayId, setNewTrainingDayId] = useState("");

    useEffect(() => {
        getWorkoutByIdService(route.params.itemId, processWorkoutByIdServiceResult);
    }, [newTrainingDayId]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            showAddTrainingIcon ? <HeaderButton icon='baseline_add_white_24dp' onIconPress={() => {showAddTrainingDayModal();}}/> : null
          ),
        });
    }, [navigation, showAddTrainingIcon]);

    function processWorkoutByIdServiceResult(apiCallOutcome, responseJson) {
        switch(apiCallOutcome) {
    
            case Constants.RESPONSE_RECEIVED:
                var data = [];
                var trainingDays = [];
                
                responseJson.day_list.forEach(day => {
                    let exerciseObj = {};
                    let title = day.days_of_week.text + " - " + day.obj.description;
                    let id = day.obj.id;

                    exerciseObj.title = title + SEPARATOR + id;
                    trainingDays = trainingDays.concat(day.obj.day);

                    exerciseObj.data = [];
                    day.set_list.forEach(set => {
                        if(set) {
                            set.exercise_list.forEach(exercise => {
                                exerciseObj.data.push(exercise.obj.name + SEPARATOR + exercise.setting_text);
                            });
                        }
                    });
                    
                    data = [...data, exerciseObj];
                });
                
                setGoal(responseJson.obj.comment);
                setData(data);

                if(trainingDays.length === 0) 
                    setAddTrainingIconVisibility(true);

                break;
    
            case Constants.API_CALL_COMPLETED:
                setLoading(false);
                break;
        }
    }

    function showAddTrainingDayModal() {
        setAddTrainingDayModalVisibility(true);
    }

    function makeAddWorkoutDayServiceCall(description, days) {
        setLoading(true);
        
        const body = {
            "description": description, 
            "training": route.params.itemId, 
            "day": days  
        };
    
        const request = {
            url: Constants.WGER_API_PATH + Constants.WGER_DAY_ENDPOINT, 
            method: 'POST', 
            body: JSON.stringify(body),
        };

        dayService(request, processDayServiceResponse);
    }

    function processDayServiceResponse(apiCallOutcome, responseJson) {
        switch(apiCallOutcome) {
    
            case Constants.RESPONSE_RECEIVED:
                setNewTrainingDayId(responseJson.id);
                setAddTrainingIconVisibility(false);
                break;
            case Constants.API_CALL_COMPLETED:
                setLoading(false);
                break;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <ActivityIndicator/> : (
                <Screen data ={data} navi={navigation} goal={goal}/>
            )}

            <AddTrainingDayModal 
                isVisible = {displayAddTrainingDayModal} 
                setVisible = {setAddTrainingDayModalVisibility} 
                callAddDayService={makeAddWorkoutDayServiceCall}/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 50,
        backgroundColor: Colors.WHITE,
    },
    listContainer: {
        paddingLeft: 12,
    },
    sectionHeader: {
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 10,
        color: Colors.ACCENT_COLOR,
        textTransform: 'uppercase'
    },
    exerciseContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 8,
        marginRight: 4,
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
        paddingBottom: 12,
        fontSize: 18,
        color: Colors.PRIMARY_COLOR,
        textTransform: 'uppercase'
    }    
})

export default WorkoutDetailsScreen;