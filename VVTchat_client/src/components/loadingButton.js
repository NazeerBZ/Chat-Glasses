import React, { Component } from 'react';
import Button from 'apsl-react-native-button';
import { Text } from 'react-native';

class LoadingButton extends Component {

    render() {
        return (
            <Button onPress={this.props.action} isLoading={this.props.isLoading}><Text>{this.props.buttonText}</Text></Button>
        )
    }
}

export default LoadingButton;
