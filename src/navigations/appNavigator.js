import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from '@expo/vector-icons/Ionicons';

import { HomeScreen } from '../scenes/home';
import { SearchScreen } from '../scenes/search';
import { WorkoutBuildingScreen} from '../scenes/workoutBuilding';
import { WorkoutTrackingScreen} from '../scenes/workoutTracking';

const Tab = createBottomTabNavigator();

export default function Navi() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        
                        if (route.name === 'Search') {
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

                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Workout" component={WorkoutBuildingScreen} />
                <Tab.Screen name="Workout traker" component={WorkoutTrackingScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }