import React from 'react';

import { ThemedSectionList } from '../../components/atoms';

const DATA = [
    {
        title: 'Recommended articles', 
        data: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
            'Ut varius pharetra sodales.',
            'Phasellus venenatis urna fringilla diam ultricies dignissim.'
        ]
    },
    {
        title: 'Workouts', 
        data: [
            'Aenean dapibus odio et facilisis malesuada. ',
            'Vestibulum vitae placerat tortor, sed congue est.'
        ]
    },
    {
        title: 'Recipes', 
        data: [
            'Sed non lacinia augue. Integer laoreet consequat porta. Quisque laoreet sed mauris ac rhoncus. Sed nec blandit lacus.'
        ]
    },
]

const HomeScreen = ({navigation}) => {
    return (
        <ThemedSectionList data={DATA} navigation={navigation}/>
    );
};

export default HomeScreen;