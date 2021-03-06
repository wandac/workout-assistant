import * as React from 'react';
import { 
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

const HeaderButton = (props) => {
    let myIcon;

    switch (props.icon) {
        case 'baseline_add_white_24dp':
            myIcon = require('../../assets/images/baseline_add_white_24dp.png');
            break;
        // default:
            // TODO: should not happen
    }
    
    return (
    <TouchableOpacity 
        onPress = {props.onIconPress}>
        <Image
            style={styles.headerIcon}
            source={myIcon}/>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    headerIcon: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
});

export default HeaderButton;