import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header, Content, Body, Title, Left, Icon, Right, Item, Input, Button } from 'native-base';

class HeaderBar extends Component {

    goToLogin = () => {
        if (this.props.isDataLoading === false) {
            this.props.RouteTo('Login');
        }
    }

    goToAddFriends = () => {
        this.props.RouteTo('Add Friends');
    }

    goToFriends = () => {
        this.props.RouteTo('Friends');
    }

    render() {
        return (
            <Header style={style.headerBG}>
                {this.props.backButton === true ?
                    <Left>
                        <Icon name='arrow-back' onPress={this.goToLogin} />
                    </Left>
                    : null}

                <Body>
                    <Title>{this.props.headerText}</Title>
                </Body>

                {this.props.rightIcons_friends === true ?
                    <Right>
                        <Icon style={style.iconStyle} name='person-add' onPress={this.goToAddFriends} />
                    </Right>
                    : null}

                {this.props.rightIcons_addFriends === true ?
                    <Right>
                        <Icon style={style.iconStyle} name='list' onPress={this.goToFriends} />
                    </Right>
                    : null}
            </Header>
        )
    }
}

export default HeaderBar;

const style = {
    rightIconStyle: {
        display: 'flex',
        flexDirection: 'row'
    },
    iconStyle: {
        color: 'white',
        marginLeft: 24
    },
    headerBG: {
        backgroundColor: '#2e3150'
    }
}