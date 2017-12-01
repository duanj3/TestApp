import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Text, Image } from 'react-native' ;

import styles from './styles';

const ClearButton = ( {text, onPress} ) => (
    <TouchableHighlight style={styles.container} onPress={onPress}>
        <View style={styles.wrapper}>
            <Image style={styles.icon} source={require('./images/ReverseIcon.png')} />
            <Text style={styles.text}>Reverse Currency</Text>
        </View>
    </TouchableHighlight>
);

ClearButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
};

export default ClearButton;