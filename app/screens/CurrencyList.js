import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, StatusBar} from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Separator } from '../components/List';
import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

class CurrencyList extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
    };
    handlePress = (currency) => {
        const { type } = this.props.navigation.state.params;
        if ( type === 'base'){
            // TODO: dispatch change base
            this.props.dispatch(changeBaseCurrency(currency));
        } else if ( type === 'quote'){
            // TODO: dispatch change quote
            this.props.dispatch(changeQuoteCurrency(currency));
        }
        this.props.navigation.goBack(null);
    };
    render(){
        let comparisonCurrency = this.props.baseCurrency;
        if (this.props.navigation.state.params.type === 'quote'){
            comparisonCurrency = this.props.quoteCurrency;
        }
        return(
            <View style={{ flex:1 }}>
                <StatusBar barstyle="default" translucent={false}/>
                <FlatList
                    data={currencies}
                    renderItem={( {item} ) =>
                        <ListItem text={item}
                                  selected={item === comparisonCurrency}
                                  onPress = {() => this.handlePress(item)}
                        />}
                    keyExtractor={item => item}
                    ItemSepratorComponent={Separator}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        baseCurrency: state.currencies.baseCurrency,
        quoteCurrency: state.currencies.quoteCurrency,
    }
};

export default connect(mapStateToProps) (CurrencyList);