import React from 'react';
import { 
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../styles';

const SubmitButton = ({title, handleOnPress}) => {
    return(
        <TouchableOpacity 
            style={styles.submitButton}
            onPress = {() => {
                handleOnPress();
            }}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

SubmitButton.propTypes = {
    title: PropTypes.string,
    handleOnPress: PropTypes.func
};

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: Colors.ACCENT_COLOR,
        borderRadius: 8,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    text: {
        color: Colors.WHITE,
        fontSize: 18,
        textTransform: 'uppercase'
    },
});

export default SubmitButton;