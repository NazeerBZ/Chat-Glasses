import Actions from '../actions/actions.js';
import { Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import { rootURL } from '../constant';
import { NavigationActions } from 'react-navigation';

class Friend_Middleware {

    static addUser(unknownUser, currentUser, RouteTo) {
        return (dispatch) => {


            dispatch(Actions.setDataLoading(true));
            var data = {
                unknownUser,
                currentUser
            }
            axios.post(`${rootURL}/api/addUser`, data)
                .then((res) => {
                    AsyncStorage.setItem('currentUser', JSON.stringify(res.data))
                        .then(() => {
                            dispatch(Actions.currentUser(res.data));
                            dispatch(Actions.setDataLoading(false));

                            RouteTo('Friends');
                        })
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(Actions.setDataLoading(false));
                })
        }
    }

    static deleteUser(currentUser, friend) {
        return (dispatch) => {

            axios.delete(`${rootURL}/api/unfriend`, {
                data: {
                    currentUser: currentUser,
                    friend: friend
                }
            })
                .then((res) => {
                    AsyncStorage.setItem('currentUser', JSON.stringify(res.data))
                        .then((result) => {
                            dispatch(Actions.currentUser(res.data));
                        })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

export default Friend_Middleware;