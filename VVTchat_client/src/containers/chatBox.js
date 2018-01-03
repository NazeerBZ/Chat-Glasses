import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import io from 'socket.io-client';
import { rootURL } from '../store/constant';
import { GiftedChat } from 'react-native-gifted-chat';
import { Container, Button, Input, Text } from 'native-base';
import { HeaderBar } from '../components';


function mapStateToProps(state) {
    return {
        currentUser: state.User_Reducer.currentUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

class ChatBox extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            chatId: ''
        }

        //The event will be called when a client is connected to server socket.
        this.socket = io(rootURL);
        this.socket.on('connect', () => {
            console.log('a user conencted(online)');

            this.props.currentUser.chatRooms.map((room) => {
                console.log(room);
                console.log(this.props.currentUser.username);
                console.log(this.props.navigation.state.params.username);
                if (room.userOne === this.props.currentUser.username && room.userTwo === this.props.navigation.state.params.username
                    || room.userOne === this.props.navigation.state.params.username && room.userTwo === this.props.currentUser.username) {

                    var user = {
                        username: this.props.currentUser.username,
                        chatId: room.chatId
                    }
                    this.associatUser(user);
                    console.log('how many times');
                    this.state.chatId = room.chatId;
                }
            })
        });

        this.socket.on('message', this.onMessagesReceived);
        // console.log(this.props.navigation.state.params);
        // console.log(this.props.currentUser);
    }

    associatUser = (user) => {
        this.socket.emit('user', user);
        console.log(user.chatId, 'chatId');
    }

    componentWillUnmount() {
        this.socket.emit('removeUser', this.props.currentUser.username);
        this.socket.disconnect();
    }

    onMessagesReceived = (messages) => {
        this.storeMessages(messages);
    }

    storeMessages = (messages) => {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages)
            }
        })
    }

    onSend = (messages) => {
        var message = messages[0]; //recevied message object in array
        message.chatId = this.state.chatId;
        this.socket.emit('message', message, this.props.currentUser.username);
        // this.storeMessages(messages);
        console.log(message);
    }

    render() {
        console.log(this.state.messages);
        return (
            <Container>
                <HeaderBar headerText={this.props.navigation.state.params.fullname} />
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={{
                        _id: this.props.currentUser.id,
                        avatar: 'http://bgcollege.in/bgclg/img/icon3.png'
                    }}
                />
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);

const style = {
}