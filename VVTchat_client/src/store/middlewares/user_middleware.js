import Actions from '../actions/actions.js';
import { Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import { rootURL } from '../constant';
import { NavigationActions } from 'react-navigation';

class User_Middleware {

    static login(username, password, RouteTo) {
        return (dispatch) => {

            dispatch(Actions.setDataLoading(true));
            var data = {
                username: username,
                password: password
            }
            
            axios.post(`${rootURL}/api/login`, data)
                .then((res) => {
                    if (res.data.name === 'Error') {
                        Alert.alert(
                            res.data.name,
                            res.data.error
                        );
                        dispatch(Actions.setDataLoading(false))
                    }
                    else {
                        this.saveCurrentUser(res.data, RouteTo)(dispatch);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(Actions.setDataLoading(false))
                })
        }
    }

    static signup(userName, email, password, fullName, RouteTo) {
        return (dispatch) => {

            dispatch(Actions.setDataLoading(true));
            var data = {
                username: userName,
                fullname: fullName,
                email: email,
                password: password
            }

            axios.post(`${rootURL}/api/signup`, data)
                .then((res) => {
                    if (res.data.name === 'Error') {
                        Alert.alert(
                            res.data.name,
                            res.data.error
                        );
                        dispatch(Actions.setDataLoading(false))
                    }
                    else {
                        this.saveCurrentUser(res.data, RouteTo)(dispatch);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(Actions.setDataLoading(false))
                })
        }
    }

    static saveCurrentUser(currentUser, RouteTo) {
        return (dispatch) => {

            AsyncStorage.setItem('currentUser', JSON.stringify(currentUser))
                .then(() => {
                    dispatch(Actions.currentUser(currentUser));
                    dispatch(Actions.setDataLoading(false));
                    AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({
                            routeName: 'SubRoutes'
                        })]
                    })
                    RouteTo.dispatch(resetAction);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    static fetchCurrentUser() {
        return (dispatch) => {
            AsyncStorage.getItem('currentUser')
                .then((result) => {
                    dispatch(Actions.currentUser(JSON.parse(result)));
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    static searchUser(username) {
        return (dispatch) => {
            dispatch(Actions.setDataLoading(true));
            axios.get(`${rootURL}/api/searchUser`, {
                headers: {
                    username: username
                }
            })
                .then((res) => {
                    console.log(res.data);
                    dispatch(Actions.searchedUser(res.data));
                    dispatch(Actions.setDataLoading(false));
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(Actions.setDataLoading(false));
                })
        }
    }

    static clearSearchedUser() {
        return (dispatch) => {
            dispatch(Actions.clearSearchedUser());
        }
    }
}

export default User_Middleware;