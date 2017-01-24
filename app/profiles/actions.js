import axios from 'axios';
import HTTP from 'http-status-codes';

import formatDate from '../shared/utils';

import { addMemberUrl, memberDetailUrl, memberListUrl, ownProfileUrl } from '../api';
import { logoutUser } from '../auth/actions';
import * as types from './types';

/*
 * Handle profile errors here
 */
function handleError(dispatch, error, type) {
  const { response } = error;
  // If we have a response, then the request reached the server and
  // was denied for some reason.
  if (response) {
    switch (error.status) {
      // HTTP 401 means the user simply isn't logged in; as usual we
      // can treat this by just logging the user out.
      case HTTP.UNAUTHORIZED:
        logoutUser()(dispatch);
        return;
      default:
        // Dispatch an error
        dispatch({ type, payload: error });
        throw error;
    }
  } else {
    // No response means a client error: the request never reached the
    // server. Handle accordingly.
    throw error;
  }
}

/*
 * POST user details to the API server
 * and handle the response
 */
function addMember(user) {
  return (dispatch) => {
    // Get the API endpoint for adding the user
    const url = addMemberUrl();
    // Format the date of birth to meet Django's expectations
    const request = { ...user, date_of_birth: formatDate(user.date_of_birth) };
    // Dispatch a 'sending' action
    dispatch({ type: types.PROFILE_CREATE_SENDING });
    // Make the request
    axios.post(url, request)
    .then((response) => {
      const data = response.data;
      // What to do with the data?
      dispatch({ type: types.PROFILE_CREATE_SUCCESS, payload: data });
    })
    .catch((error) => {
      console.error(error);
      handleError(dispatch, error, types.PROFILE_CREATE_ERROR);
    });
  };
}

/*
 * Retrieve a user's profile by ID.
 */
function fetchMember(uid) {
  return function fetch(dispatch) {
    const url = memberDetailUrl(uid);
    dispatch({ type: types.MEMBER_DETAIL_FETCHING });
    axios.get(url)
    .then((response) => {
      const { data } = response;
      dispatch({ type: types.MEMBER_DETAIL_RECEIVED, payload: data });
    });
  };
}

/*
 * Retrieve all SINC members (which will be a *lot*, so use sparingly)
 */
function fetchMembers() {
  return function fetch(dispatch) {
    const url = memberListUrl();
    return axios.get(url)
    .then((response) => {
      const { data } = response;
      dispatch({ type: types.MEMBER_LIST_RECEIVED, payload: data });
    })
    .catch((error) => {
      handleError(dispatch, error, types.MEMBER_LIST_ERROR);
    });
  };
}

/*
 * Retrieve the user's profile information.
 */
function fetchProfile() {
  return (dispatch) => {
    // Make a GET request to the API server's own-profile URL
    // and handle the response
    const url = ownProfileUrl();
    axios.get(url)
    .then((response) => {
      // If we're here, then the server responded with a 2xx and we should have
      // the profile data; dispatch an event
      const profile = response.data;
      dispatch({ type: types.PROFILE_RECEIVED, payload: profile });
    })
    .catch((error) => {
      // If we're here, then the server responded with an error of some sort;
      // let the error handler take care of it
      handleError(dispatch, error);
    });
  };
}

function updateMember(user) {
  return function update(dispatch) {
    const { id } = user;
    const request = { ...user, date_of_birth: formatDate(user.date_of_birth) };
    // Get the API endpoint
    const url = memberDetailUrl(id);
    dispatch({ type: types.UPDATE_MEMBER_SENDING });
    axios.patch(url, request)
    .then((response) => {
      const { data } = response;
      dispatch({ type: types.UPDATE_MEMBER_SUCCESS, payload: data });
    })
    .catch((error) => {
      handleError(dispatch, error);
    });
  };
}

function updateOwnProfile(user) {
  return function update(dispatch) {
    const { id } = user;
    const request = { ...user, date_of_birth: formatDate(user.date_of_birth) };
    const url = memberDetailUrl(id);
    dispatch({ type: types.PROFILE_UPDATE_SENDING });
    axios.patch(url, request)
    .then((response) => {
      const { data } = response;
      dispatch({ type: types.PROFILE_UPDATE_SUCCESS, payload: data });
    })
    .catch((error) => {
      handleError(dispatch, error, types.PROFILE_UPDATE_ERROR);
    });
  };
}

export {
  addMember,
  fetchMember,
  fetchMembers,
  fetchProfile,
  updateMember,
  updateOwnProfile,
};
