import Actions from '../actions/actions.js';
import { Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import { rootURL } from '../constant';
import { NavigationActions } from 'react-navigation';

class Settings_Middleware {

    static routeToSettings(username, RouteTo) {
        return (dispatch) => {
            //fetching Current_User data with password
            axios.get(`${rootURL}/api/userCredentials`, {
                headers: {
                    username: username
                }
            })
                .then((res) => {
                    // var user = {
                    //     id: res.data._id,
                    //     username: res.data.username,
                    //     fullname: res.data.fullname,
                    //     email: res.data.email,
                    //     friendList: res.data.friendList,
                    //     chatRooms: res.data.chatRooms,
                    // }
                    // AsyncStorage.setItem('currentUser', JSON.stringify(user))
                    //     .then((result) => {
                    //         dispatch(Actions.currentUser(user));
                    RouteTo('Settings', res.data);  // with password property
                    //     })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    static updateUser(userNewSettings, RouteTo) {
        return (dispatch) => {
            dispatch(Actions.setDataLoading(true));

            //updating user data
            axios.post(`${rootURL}/api/updateUser`, userNewSettings)
                .then((res) => {

                    if (res.data.name === 'Error') {
                        Alert.alert(
                            res.data.name,
                            res.data.error
                        )
                        dispatch(Actions.setDataLoading(false));
                    }
                    else {
                        AsyncStorage.setItem('currentUser', JSON.stringify(res.data.updatedUser))
                            .then(() => {
                                dispatch(Actions.currentUser(res.data.updatedUser));
                                dispatch(Actions.setDataLoading(false));
                                Alert.alert(
                                    'Success',
                                    res.data.message
                                )
                                RouteTo('SubRoutes');
                            })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(Actions.setDataLoading(true));
                })
        }
    }
}

export default Settings_Middleware;