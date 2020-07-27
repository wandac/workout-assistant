import React from 'react';

import { ThemedSectionList } from '../../components/organisms';

const DATA = [
    {
        title: 'Recommended articles', 
        data: [
            '{"title": "Fitness In The City", "text": "Healthy living in an urban environment comes with its own set of unique challenges. Fitness In The City is targeted at working professionals in urban settings seeking an escape through their diet and fitness pursuits. The recipe and fitness resources are fantastic, but the gorgeous food photography alone will have you hooked!", "url": "http://fitnessinthecity.com.au/"}',
            '{"title": "Life","text": "Life by Daily Burn is dedicated to helping you live a healthier, happier and more active lifestyle. The blog goes the extra mile to empower you to take control over physical, mental, and emotional lives. If your goal is to lose weight, gain strength, reduce stress, or make healthier food choices, Life provides reliable and insightful articles to help you achieve your personal goals.", "url": "https://dailyburn.com/landing"}',
            '{"title": "Eating Bird Food","text": "Making changes to your eating habits can be challenging. That’s exactly why Brittany started her blog Eating Bird Food. Her passion is to help others live happier and healthier lives providing simple ways to implement diet changes to allow you to become your best self.  The blog consists of diet specific recipes, including gluten free, diary free, vegan, paleo, and low carb, tips on how to change eating habits, and her own personal health stories.", "url": "https://www.eatingbirdfood.com/"}',
        ]
    },
    {
        title: 'Workouts', 
        data: [
            '{"title": "","text": "Aenean dapibus odio et facilisis malesuada.", "url": ""}',
            '{"title": "","text": "Vestibulum vitae placerat tortor, sed congue est.", "url": ""}',
        ]
    },
    {
        title: 'Recipes', 
        data: [
            '{"title": "","text": "Sed non lacinia augue. Integer laoreet consequat porta. Quisque laoreet sed mauris ac rhoncus. Sed nec blandit lacus.", "url": ""}',
        ]
    },
]

const HomeScreen = ({navigation}) => {
    return (
        <ThemedSectionList data={DATA} navigation={navigation}/>
    );
};

export default HomeScreen;