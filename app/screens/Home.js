import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import {  Logo } from '../components/Logo';
import {  InputWithButton } from '../components/TextInput';
import {  ClearButton } from '../components/Buttons';
import {  LastConverted } from '../components/Text';
import { Header } from '../components/Header';

import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';


const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '11.39';
const TEMP_CONVERSION_RATE = 0.1139;
const TEMP_CONVERSION_DATE = new Date();

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        amount: PropTypes.number,
        conversionRate: PropTypes.number,
        isFetching: PropTypes.bool,
        lastConvertedDate: PropTypes.object,
    };

    componentWillMount(){
        this.props.dispatch(getInitialConversion());
    }

    handlePressBaseCurrency = () =>{
        this.props.navigation.navigate('CurrencyList', {title: 'Base Currency', type: 'base'});
    };
    handlePressQuoteCurrency = () => {
        this.props.navigation.navigate('CurrencyList', {title: 'Quote Currency', type: 'quote'});
    };
    handleTextChange = (amount) => {
        // TODO: need to this.props.dispatch this function
        this.props.dispatch(changeCurrencyAmount(amount));
    };
    handleSwapCurrency = () => {
        // TODO: need to this.props.dispatch this function
        this.props.dispatch(swapCurrency());
};
    handleOptionsPress = () => {
        this.props.navigation.navigate('Options', {title: 'Options'});
    };
    render(){
        let quotePrice = ( this.props.amount * this.props.conversionRate ).toFixed(2);
        if (this.props.isFetching){
            quotePrice = '...';
        }
        return(
            <Container>
                <StatusBar translucent={false} barStyle="light-content" />
                <Header
                    onPress={this.handleOptionsPress}
                />
                <KeyboardAvoidingView behavior='padding'>
                    <Logo />
                    <InputWithButton
                        buttonText={this.props.baseCurrency}
                        onPress={this.handlePressBaseCurrency}
                        defaultValue={this.props.amount.toString()}
                        keyboardType="numeric"
                        onChangeText={this.handleTextChange}
                        />
                    <InputWithButton
                        buttonText={this.props.quoteCurrency}
                        editable= {false}
                        onPress={this.handlePressQuoteCurrency}
                        value={quotePrice}
                        />
                    <LastConverted
                        base = { this.props.baseCurrency }
                        quote = { this.props.quoteCurrency }
                        date = { this.props.lastConvertedDate }
                        conversionRate= { this.props.conversionRate }
                    />
                    <ClearButton
                        onPress={this.handleSwapCurrency}
                        />
                </KeyboardAvoidingView>
            </Container>
        )
    }
}

const mapStateToProps= (state) => {
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;
    const conversionSelector = state.currencies.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};

    return{
        baseCurrency,
        quoteCurrency,
        amount:state.currencies.amount,
        conversionRate: rates[quoteCurrency] || 0,
        isFetching: conversionSelector.isFetching,
        LastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    };
};

export default connect(mapStateToProps)(Home);