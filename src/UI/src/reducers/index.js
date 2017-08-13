import {createStore, combineReducers, applyMiddleware} from 'redux'
import createHashHistory from 'history/createHashHistory'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import ListReducer from './list';
import EditReducer from './edit';

var reducers = combineReducers({
    list: ListReducer,
    edit: EditReducer,
    router: routerReducer
});
const history = createHashHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  reducers,
  applyMiddleware(middleware)
);

export {store, history};