import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

// Import reducers from submodules
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth/reducers';
import coursesReducer from './courses/reducers';
import clubQualificationsReducer from './club-qualifications/reducers';
import currentMembersReducer from './search-current-members/reducers';
import currentMembershipStatusReducer from './membership-history/reducers';
import qualificationsReducer from './member-qualifications/reducers';
import regionsReducer from './regions/reducers';

// Import action types
import * as authActionTypes from './auth/types';
// Import our main app
// Import routes
import routes from './routes';
// Require styles
import styles from './styles/main.scss'; // eslint-disable-line

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  clubQualifications: clubQualificationsReducer,
  courses: coursesReducer,
  currentMembers: currentMembersReducer,
  currentMembershipStatus: currentMembershipStatusReducer,
  form: formReducer,
  memberQualifications: qualificationsReducer,
  regions: regionsReducer,
});

// Create the store
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Check whether we're logged in at page load
const token = cookie.load('token');
if (token) {
  // TODO: Check that this token is OK (in case it's expired) and redirect
  // to login
  axios.defaults.headers.common.Authorization = `Token ${token}`;
  store.dispatch({ type: authActionTypes.LOGIN_SUCCESS });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('#react-main')
);
