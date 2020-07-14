import React from 'react';
import { 
    SectionList, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';

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

const Item = ({ text }) => (
    <Text style={styles.item}>{text}</Text>
);

const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
);

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <SectionList
                sections={DATA}
                renderItem={({item}) => <Item text={item}/>}
                renderSectionHeader={({section}) => <SectionHeader title={section.title}/>}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 20,
     backgroundColor: 'white',
    },
    sectionHeader: {
      paddingTop: 4,
      paddingLeft: 12,
      paddingRight: 12,
      paddingBottom: 4,
      fontSize: 10,
      color: 'tomato',
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
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      color: 'gray',
    },
})

export default HomeScreen;