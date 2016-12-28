import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

// Import reducers from submodules
import activeInstructorsReducer from './active-instructors/reducers';
import authReducer from './auth/reducers';
import coursesReducer from './courses/reducers';
import currentMembersReducer from './search-current-members/reducers';
import currentMembershipStatusReducer from './membership-history/reducers';
import qualificationsReducer from './qualifications/reducers';
import regionsReducer from './regions/reducers';

// import authentication action types (in case we're authenticated at
// startup)
import * as authActionTypes from './auth/types';

// Import routes
import routes from './routes';

// Require styles to be bundled; linting is disabled on this line because
// eslint thinks that we're defining something that's never used
import styles from './styles/main.scss'; // eslint-disable-line

// Combine our submodule reducers
const rootReducer = combineReducers({
  activeInstructors: activeInstructorsReducer,
  auth: authReducer,
  qualifications: qualificationsReducer,
  courses: coursesReducer,
  currentMembers: currentMembersReducer,
  currentMembershipStatus: currentMembershipStatusReducer,
  form: formReducer,
  regions: regionsReducer,
});

// Create the store
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
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
