import React, { Component } from 'react';
import { View, Image, Text, Keyboard, Animated, Platform } from 'react-native';
import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends React.Component {
    constructor(props){
        super(props);

        this.containerImageWidth = new Animated.Value(styles.$largeContainerSize);
    }
    componentDidMount(){
        let showListner = 'keyboardWillShow';
        let hideListner = 'keyboardWillHide';
        if ( Platform.OS === 'android' ){
            showListner = 'keyboardDidShow';
            hideListner = 'keyboardDidHide';
        }
        this.keyboardShowListener = Keyboard.addListener(showListner, this.keyboardShow);
        this.keyboardHideListener = Keyboard.addListener(hideListner, this.keyboardHide);
    }
    componentWillUnmount(){
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }
    keyboardShow = () => {
        Animated.timing(this.containerImageWidth, {
            toValue: styles.$smallContainerSize,
            duration: ANIMATION_DURATION,
        }).start();
    };
    keyboardHide = () => {
        Animated.timing(this.containerImageWidth, {
            toValue: styles.$largeContainerSize,
            duration: ANIMATION_DURATION,
        }).start();
    };

    render(){
        const containerImageStyle = [
            styles.containerImage,
            { width: this.containerImageWidth },
        ];

        return(
            <View style = {styles.container}>
                <Animated.Image
                    resizeMode="contain"
                    style = {containerImageStyle}
                    source={require('./images/CurrencyExchange.jpg')}>
                </Animated.Image>
                <Text style={styles.currencyText}>Currency Converter</Text>
            </View>
        )
    }
}

export default Logo;