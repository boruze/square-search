import React from "react";
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import CoordinateList from './containers/list';
import NewList from './containers/new-list';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHashHistory from 'history/createHashHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import ListReducer from './reducers/list';
import EditReducer from './reducers/edit';

var reducers = combineReducers({
    list: ListReducer,
    edit: EditReducer,
    router: routerReducer
});
const history = createHashHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  reducers,
  applyMiddleware(middleware)
)
// window.state - globally accessible readonly redux state for debugging purposes
Object.defineProperty(window, "state", { get: function() { return store.getState(); } });

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
            <Route exact path="/" component={CoordinateList}/>
            <Route exact path="/:id" component={NewList} />
            </div>
        </ConnectedRouter>
    </Provider>, document.getElementById('app'));