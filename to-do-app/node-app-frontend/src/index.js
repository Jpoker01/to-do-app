import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import './index.css';
import App from './components/App/App';
import taskWatcher from './redux/task.watcher.saga';
import userWatcher from './redux/user.watcher.saga';

import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import taskList from './redux/task.reducer';
import user from './redux/user.reducer';

import { BrowserRouter as Router } from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();

// Don't include logger in Redux middleware unless in development mode
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  // add each of the reducers to the store
  combineReducers({
    taskList,
    user
  }),
  // adds listed middleware to the store
  applyMiddleware(...middlewareList),
);

sagaMiddleware.run(userWatcher);
sagaMiddleware.run(taskWatcher);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);


