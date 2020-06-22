import { createBottomTabNavigator } from 'react-navigation-tabs';

import { HomeScreen } from '../scenes/home';
import { SearchScreen } from '../scenes/search';
import { WorkoutBuildingScreen} from '../scenes/workoutBuilding';
import { WorkoutTrackingScreen} from '../scenes/workoutTracking';

const TabNavigatorConfig = {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    Home: {
        screen: HomeScreen,
    },
    Search: {
        screen: SearchScreen,
    },
    Workout: {
        screen: WorkoutBuildingScreen
    },
    Tracking: {
        screen: WorkoutTrackingScreen
    }
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;