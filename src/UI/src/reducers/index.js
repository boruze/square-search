import ListReducer from './list';
import EditReducer from './edit';
import { combineReducers } from 'redux';
import {createStore} from "redux";

var reducers = combineReducers({
    list: ListReducer,
    edit: EditReducer
});

const store = createStore(reducers);
export default store;