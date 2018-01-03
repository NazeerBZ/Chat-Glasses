import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { HeaderBar, SearchBar, SearchResult } from '../components';
import { User_Middleware, Friend_Middleware } from '../store/middlewares';

function mapStateToProps(state) {
    return {
        isDataLoading: state.Loader_Reducer.isDataLoading,
        currentUser: state.User_Reducer.currentUser,
        searchedUser: state.User_Reducer.searchedUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchUser: (username) => { dispatch(User_Middleware.searchUser(username)) },
        addUser: (unknownUser, currentUser, RouteTo) => { dispatch(Friend_Middleware.addUser(unknownUser, currentUser, RouteTo)) }
    }
}

class AddFriends extends Component {

    render() {
        return (
            <Container style={style.containerStyle}>
                <HeaderBar headerText='Add Friend' rightIcons_addFriends={true} RouteTo={this.props.navigation.navigate} />
                <SearchBar searchUser={this.props.searchUser} />

                {
                    this.props.searchedUser.username ?
                        <SearchResult
                            searchedUser={this.props.searchedUser}
                            addUser={this.props.addUser}
                            currentUser={this.props.currentUser}
                            RouteTo={this.props.navigation.navigate} />
                        : null
                }

                {
                    this.props.isDataLoading ?
                        <ActivityIndicator
                            color="black"
                            size="large"
                            style={style.centering}
                            animating={true}
                        />
                        : null
                }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);

const style = {
    containerStyle: {
        backgroundColor: '#ece9e2'
    },
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
}