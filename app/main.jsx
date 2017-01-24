import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import rootReducer from './root-reducer';

// Import react-redux-notifications stuff
import {
  reducer as notifications,
  middleware as NotificationMiddleware,
} from 'react-redux-notifications';

import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';


// import authentication action types (in case we're authenticated at
// startup)
import * as authActionTypes from './auth/types';

// Import routes
import routes from './routes';

// Import our style rules
import './styles/main.scss'; // eslint-disable-line

// Set up react-widget localization
momentLocalizer(moment);

// Create the store
const createStoreWithMiddleware = applyMiddleware(reduxThunk, NotificationMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Check whether we're logged in at page load and dispatch an action
const token = cookie.load('token');
if (token) {
  // TODO: Check that this token is OK (in case it's expired) and redirect to login
  // Configure Axios to send the token in the header for all requests
  axios.defaults.headers.common.Authorization = `Token ${token}`;
  // Dispatch a LOGIN_SUCCESS
  store.dispatch({ type: authActionTypes.LOGIN_SUCCESS });
}

// Render the app
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('#react-main')
);
