import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from '@expo/vector-icons/Ionicons';

import { HomeScreen } from '../scenes/home';
import { SearchScreen } from '../scenes/search';
import { WorkoutBuildingScreen } from '../scenes/workoutBuilding';
import { WorkoutTrackingScreen } from '../scenes/workoutTracking';
import { WorkoutDetailsScreen } from '../scenes/workoutDetails';
import Constants from '../utils/config';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name={Constants.HOME_SCREEN} component={HomeScreen}/>
            <HomeStack.Screen name={Constants.DETAILS_SCREEN} component={WorkoutDetailsScreen}/>
        </HomeStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
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
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>

                <Tab.Screen name={Constants.HOME_SCREEN} component={HomeStackScreen} />
                <Tab.Screen name={Constants.SEARCH_SCREEN} component={SearchScreen} />
                <Tab.Screen name={Constants.WORKOUT_SCREEN} component={WorkoutBuildingScreen} />
                <Tab.Screen name={Constants.WORKOUT_TRAKER_SCREEN} component={WorkoutTrackingScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }