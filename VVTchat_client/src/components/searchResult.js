import React, { Component } from 'react';
import profilPicture from '../../images/profilePic.png';
import { Image } from 'react-native'
import { Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon, Button } from 'native-base';

class SearchResult extends Component {

    addUser = () => {
        this.props.addUser(this.props.searchedUser, this.props.currentUser, this.props.RouteTo);
    }

    showAddButton = () => {
        // console.log(this.props.currentUser);
        // console.log(this.props.searchedUser);
        var friendCount = 0;
        var flag = true;
        var numOfFriends = this.props.currentUser.friendList.length;

        if (this.props.searchedUser.id !== this.props.currentUser.id) {
            if (this.props.currentUser.friendList.length !== 0) {

                return this.props.currentUser.friendList.map((friend, index) => {
                    friendCount++;
                    if (this.props.searchedUser.id === friend._id) {
                        flag = false;
                        return (
                            <Button key={index} style={style.addButtonStyle} small>
                                <Text>Friend</Text>
                            </Button>
                        )
                    }
                    else if (numOfFriends === friendCount && flag === true) {
                        return (
                            <Button key={index} style={style.addButtonStyle} iconLeft small onPress={this.addUser}>
                                <Icon name='add' />
                                <Text>Add</Text>
                            </Button>
                        )
                    }

                })
            }
            else {
                return (
                    <Button style={style.addButtonStyle} iconLeft small onPress={this.addUser}>
                        <Icon name='add' />
                        <Text>Add</Text>
                    </Button>
                )
            }
        }
        else {
            return (
                <Button style={style.addButtonStyle} small>
                    <Text>You</Text>
                </Button>
            );
        }
    }

    render() {
        return (
            <Content style={style.contentStyle}>
                <List style={style.listStyle}>
                    <ListItem avatar style={style.listItemStyle}>
                        <Left>
                            <Image source={profilPicture} style={style.thumbnailStyle} />
                        </Left>
                        <Body>
                            <Text>{this.props.searchedUser.fullname}</Text>
                            <Text note></Text>
                        </Body>
                        <Right>
                            {this.showAddButton()}
                        </Right>
                    </ListItem>
                </List>
            </Content>
        );
    }
}

export default SearchResult;

const style = {
    contentStyle: {
        marginTop: 10
    },
    thumbnailStyle: {
        width: 50,
        height: 50,
        marginLeft: 8
    },
    listStyle: {
        backgroundColor: '#ece9e2'
    },
    listItemStyle: {
        marginLeft: 0,
        backgroundColor: '#ece9e2'
    },
    iconStyle: {
        marginRight: 10,
        color: 'black'
    },
    addButtonStyle: {
        marginTop: 5,
        backgroundColor: '#2e3150'
    }
}