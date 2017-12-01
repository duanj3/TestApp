import React from 'react';
import PropTypes from 'prop-types';
import color from 'color';
import { View,Text,TextInput,TouchableHighlight } from 'react-native';

import styles from './styles';

const InputWithButton = ( props ) => {
    const {onPress, buttonText, editable} = props;

    const containerStyles = [styles.container];

    const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
        styles.$buttonBackgroundColorModifier,
    );

    if (editable === false){
        containerStyles.push(styles.containerDisabled);
    }
    return (
        <View style={containerStyles}>
            <TouchableHighlight onPress={props.onPress} underlayColor={underlayColor} style={styles.buttonContainer}>
                <Text vstyle={styles.buttonText}>{props.buttonText}</Text>
            </TouchableHighlight>
            <View style={styles.border}/>
            <TextInput style={styles.input} underlineColorAndroid="transparent" {...props}/>
        </View>
    );
};

InputWithButton.propTypes = {
    onPress: PropTypes.func,
    buttonText: PropTypes.string,
    editable: PropTypes.bool,
};

export default InputWithButton;