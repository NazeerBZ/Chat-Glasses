import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { FriendList, HeaderBar } from '../components';
import { User_Middleware, Friend_Middleware } from '../store/middlewares';

function mapStateToProps(state) {
    return {
        currentUser: state.User_Reducer.currentUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearSearchedUser: () => { dispatch(User_Middleware.clearSearchedUser()) },
        deleteUser: (currentUser, friend) => { dispatch(Friend_Middleware.deleteUser(currentUser, friend)) }
    }
}

class Friends extends Component {

    componentWillMount() {
        this.props.clearSearchedUser();
    }

    render() {
        return (
            <Container style={style.containerStyle}>
                <HeaderBar headerText='Friends' rightIcons_friends={true} RouteTo={this.props.navigation.navigate} />
                <FriendList currentUser={this.props.currentUser} deleteUser={this.props.deleteUser} RouteTo={this.props.navigation.navigate} />
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);

const style = {
    containerStyle:{
        backgroundColor: '#ece9e2'
    }
}