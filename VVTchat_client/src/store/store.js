import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Loader_Reducer, User_Reducer } from './reducers';

const rootReducer = combineReducers({
    Loader_Reducer,
    User_Reducer
});

const Store = createStore(rootReducer, undefined, compose(applyMiddleware(thunk)));
export default Store;