import React from "react";
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import {Route} from 'react-router';
import CoordinateList from './containers/list';
import NewList from './containers/new-list';
import {store, history} from "./reducers"

// window.state - globally accessible readonly redux state for debugging purposes
Object.defineProperty(window, "state", { get: function() { return store.getState(); } });
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
            <Route exact path="/" component={CoordinateList}/>
            <Route exact path="/:id" component={NewList}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);