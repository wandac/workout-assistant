import 'react-native-gesture-handler';
import React, { useEffect, useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from '@expo/vector-icons/Ionicons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { HomeScreen } from '../scenes/home';
import { SearchScreen } from '../scenes/search';
import { WorkoutBuildingScreen } from '../scenes/workoutBuilding';
import { WorkoutTrackingScreen } from '../scenes/workoutTracking';
import { WorkoutDetailsScreen, WorkoutAddExerciseScreen } from '../scenes/workoutDetails';
import Constants from '../utils/config';
import { Colors } from '../styles';
import { fetchExercise } from '../redux/actions/exerciseActions';
import { render } from 'react-dom';

const HomeStack = createStackNavigator();

const screenOptions = {
    headerStyle: {
        backgroundColor: Colors.ACCENT_COLOR,
    },
    headerTintColor: Colors.WHITE,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            screenOptions={screenOptions}>
            <HomeStack.Screen name={Constants.HOME_SCREEN} component={HomeScreen}/>
        </HomeStack.Navigator>
    )
}

const SearchStack = createStackNavigator();

const SearchStackScreen = () => (
    <SearchStack.Navigator
        screenOptions={screenOptions}>
        <SearchStack.Screen name={Constants.SEARCH_SCREEN} component={SearchScreen}/>
    </SearchStack.Navigator>
);

const WorkoutStack = createStackNavigator();

function WorkoutStackScreen() {
    return (
        <WorkoutStack.Navigator
            screenOptions={screenOptions} >
            <WorkoutStack.Screen name={Constants.WORKOUT_SCREEN} component={WorkoutBuildingScreen}/>
            <WorkoutStack.Screen name={Constants.WORKOUT_DETAILS_SCREEN} component={WorkoutDetailsScreen}/>
            <WorkoutStack.Screen name={Constants.WORKOUT_ADD_EXERCISE_SCREEN} component={WorkoutAddExerciseScreen}/> 
        </WorkoutStack.Navigator>
    )
}

const WorkoutTrackerStack = createStackNavigator();

const WorkoutTrackerStackScreen = () => (
    <WorkoutTrackerStack.Navigator screenOptions={screenOptions}>
        <WorkoutTrackerStack.Screen name={Constants.WORKOUT_TRAKER_SCREEN} component={WorkoutTrackingScreen}/>
    </WorkoutTrackerStack.Navigator>
);

const Tab = createBottomTabNavigator();

class AppNavigation extends Component {
    componentDidMount() {
        this.props.fetchExercise();
    }

    render() {
        if (this.props.exercises.isFetching) {
            return (<ActivityIndicator size="large" />);    //TODO position loader
        }
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            
                            if (route.name === Constants.SEARCH_SCREEN) {
                                iconName = 'ios-search';
                            }
                            
                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    
                    tabBarOptions={{
                        activeTintColor: Colors.ACCENT_COLOR,
                        inactiveTintColor: Colors.PRIMARY_COLOR,
                        style: {
                            height: 50,
                        },
                    }}>

                    <Tab.Screen name={Constants.HOME_SCREEN} component={HomeStackScreen} />
                    <Tab.Screen name={Constants.SEARCH_SCREEN} component={SearchStackScreen} />
                    <Tab.Screen name={Constants.WORKOUT_SCREEN} component={WorkoutStackScreen} />
                    <Tab.Screen name={Constants.WORKOUT_TRAKER_SCREEN} component={WorkoutTrackerStackScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

AppNavigation.propTypes = {
    fetchExercise: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        exercises: state
    };
}

export default connect(mapStateToProps, { fetchExercise })(AppNavigation);