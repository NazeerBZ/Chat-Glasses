import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { User_Middleware } from '../store/middlewares';

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearSearchedUser: () => { dispatch(User_Middleware.clearSearchedUser()) }
    }
}

class Logout extends Component {

    componentWillMount() {

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'Login'
            })]
        });

        this.props.navigation.dispatch(resetAction);
        this.props.clearSearchedUser();
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    }

    render() {
        return (
            <ActivityIndicator
                color="black"
                size="large"
                style={style.centering}
                animating={true}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

const style = {
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
}

