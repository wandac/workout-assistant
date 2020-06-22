import { createBottomTabNavigator } from 'react-navigation-tabs';

import { HomeScreen } from '../scenes/home';
import { SearchScreen } from '../scenes/search';

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
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;