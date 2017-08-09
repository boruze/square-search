import ListReducer from './list';
import EditReducer from './edit';
import { combineReducers } from 'redux';

var reducers = combineReducers({
    list: ListReducer,
    edit: EditReducer
});

export default reducers;