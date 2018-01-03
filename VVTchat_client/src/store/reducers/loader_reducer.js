import ActionType from '../actionTypes';

const INITIAL_STATE = {
    isDataLoading: false
}

function Loader_Reducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case ActionType.SET_DATA_LOADING:
            return Object.assign({}, state, { isDataLoading: action.flag })

        default: return state
    }
}

export default Loader_Reducer;