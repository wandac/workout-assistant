import React, { useState, useEffect, useContext } from 'react';
import { 
    Text,
    ActivityIndicator,
    StyleSheet,
    View,
    SectionList,
    TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { 
    getWorkoutByIdService, 
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
                sections={data}
                renderItem={({item}) => <Item text={item} navi={navi}/>}
                renderSectionHeader={({section}) => <SectionHeader title={section.title}/>}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

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

const WorkoutDetailsScreen = ({route, navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [goal, setGoal] = useState("");
    const [showAddTrainingIcon, setAddTrainingIconVisibility] = useState(false);
    const [displayAddTrainingDayModal, setAddTrainingDayModalVisibility] = useState(false);

    useEffect(() => {
        getWorkoutByIdService(route.params.itemId, processWorkoutByIdServiceResult);
    }, []);

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
                    exerciseObj.title = day.days_of_week.text + " - " + day.obj.description;
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

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator/> : (
                <Screen data ={data} navi={navigation} goal={goal}/>
            )}

            <AddTrainingDayModal isVisible = {displayAddTrainingDayModal} setVisible = {setAddTrainingDayModalVisibility}/>
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