import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

class SearchBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usernameText: ''
        }
    }

    search = () => {
        this.props.searchUser(this.state.usernameText);
    }


    render() {
        return (
            <Header searchBar rounded style={style.searchbarBG}>
                <Item>
                    <Icon name="ios-people" />
                    <Input onChangeText={(usernameText) => { this.setState({ usernameText }) }} placeholder="Enter Username" />
                    <Button light onPress={this.search}>
                        <Icon name="ios-search" />
                    </Button>
                </Item>
            </Header>
        )
    }
}

export default SearchBar;

const style = {
    searchbarBG: {
        backgroundColor: '#2e3150'
    }
}