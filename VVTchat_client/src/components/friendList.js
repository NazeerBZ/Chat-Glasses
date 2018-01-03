import React, { Component } from 'react';
import profilPicture from '../../images/profilePic.png';
import { Image } from 'react-native'
import { Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';

class FriendList extends Component {

    goToChatBox = (friend) => {
        this.props.RouteTo('ChatBox', friend);
    }

    deleteUser = (currentUser, friend) => {
        this.props.deleteUser(currentUser, friend);
    }

    showListItem = () => {
        if (this.props.currentUser.friendList) {
            return this.props.currentUser.friendList.map((friend) => {
                return (
                    <ListItem avatar key={friend._id} style={style.listItemStyle} onPress={this.goToChatBox.bind(this, friend)}>
                        <Left>
                            <Image source={profilPicture} style={style.thumbnailStyle} />
                        </Left>
                        <Body>
                            <Text>{friend.fullname}</Text>
                            <Text note>{friend.username}</Text>
                        </Body>
                        <Right>
                            <Button style={style.addButtonStyle} small onPress={this.deleteUser.bind(this, this.props.currentUser, friend)}>
                                <Text>unfriend</Text>
                            </Button>
                        </Right>
                    </ListItem>
                )
            })
        }
    }

    render() {
        return (
            <List style={style.listStyle}>
                {this.showListItem()}
            </List>
        );
    }
}

export default FriendList;

const style = {
    listStyle: {

    },
    thumbnailStyle: {
        width: 40,
        height: 40,
        marginLeft: 8
    },
    listItemStyle: {
        marginLeft: 0,
        backgroundColor: '#ece9e2'
    },
    addButtonStyle: {
        marginTop: 5,
        backgroundColor: '#2e3150'
    }
}