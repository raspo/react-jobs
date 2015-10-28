import '../less/app.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { ReduxRouter, routerStateReducer, reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

const reducer = combineReducers({
    router: routerStateReducer
});

const store = compose(
    applyMiddleware(thunk),
    reduxReactRouter({ routes, createHistory })
)(createStore)(reducer);

ReactDOM.render(
    <Provider store={store}>
        <ReduxRouter />
    </Provider>,
    document.getElementById('app')
);
