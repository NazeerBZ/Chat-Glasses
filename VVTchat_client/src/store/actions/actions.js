import ActionType from '../actionTypes';

class Actions {

    static setDataLoading(flag) {
        return {
            type: ActionType.SET_DATA_LOADING,
            flag: flag
        }
    }

    static currentUser(payload) {
        return {
            type: ActionType.CURRENT_USER,
            payload: payload
        }
    }

    static searchedUser(payload) {
        return {
            type: ActionType.SEARCHED_USER,
            payload: payload
        }
    }

    static clearSearchedUser() {
        return {
            type: ActionType.CLEAR_SEARCHED_USER,
        }
    }
}

export default Actions;