import React, { Component } from 'react';
import './../styles/index.css';

import {Provider} from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import Home from './page/home';
import Content from './content/content';

import {createStore, applyMiddleware} from 'redux';
import allReducers from './../reducers';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const history = createHistory();
const routerHistory = routerMiddleware(history);
const middleware = composeWithDevTools( applyMiddleware( routerHistory, thunk, logger ) );
const store = createStore (allReducers, middleware);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/articles/:id" component={Content}/>
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
  }
}

export default App;
