import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar, Platform, Linking } from 'react-native';
import { ListItem, Separator} from '../components/List';
import Icon from 'react-native-vector-icons/FontAwesome';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 20;

class Options extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    };
    handleThemePress = () => {
        this.props.navigation.navigate('Themes', {title: 'Themes'});
    };
    handleSitePress = () => {
        Linking.openURL('http://fixer.io').catch(() => alert('An error occured'))
    };

    render(){
        return(
            <ScrollView>
                <StatusBar translucent={false} barStyle="default" />
                <ListItem
                    text="Themes"
                    onPress={this.handleThemePress}
                    customIcon={
                        <Icon name={`chevron-right`} size={ICON_SIZE} color={ICON_COLOR} />
                    }
                />
                <Separator />
                <ListItem
                    text="Fixer.io"
                    onPress={this.handleSitePress}
                    customIcon = {
                        <Icon name={`chevron-right`} size={ICON_SIZE} color={ICON_COLOR} />}
                />
                <Separator />
            </ScrollView>
        )
    }
}

export default Options;;