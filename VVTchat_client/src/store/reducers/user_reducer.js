
import ActionType from '../actionTypes';

const INITIAL_STATE = {
    currentUser: {},
    searchedUser: {}
}

function User_Reducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case ActionType.CURRENT_USER:
            return { ...state, currentUser: action.payload }

        case ActionType.SEARCHED_USER:
            return { ...state, searchedUser: action.payload }

        case ActionType.CLEAR_SEARCHED_USER:
            return { ...state, searchedUser: {} }

        default: return state
    }
}

export default User_Reducer;