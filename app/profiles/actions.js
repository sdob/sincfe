import axios from 'axios';
import HTTP from 'http-status-codes';

import { addMemberUrl, memberDetailUrl, memberListUrl, ownProfileUrl } from '../api';
import { createApiAction } from '../shared';
import { logoutUser } from '../auth/actions';
import * as types from './types';
import {
  memberCreate,
  memberDetail,
  memberList,
  memberUpdate,
  ownProfileRetrieve,
  ownProfileUpdate,
} from './types';

/* Create a new user. */
const addMember = (user) => createApiAction(addMemberUrl(), 'post', memberCreate, user);

/* Retrieve a user's profile by ID. */
const fetchMember = (uid) => createApiAction(memberDetailUrl(uid), 'get', memberDetail);

/* Retrieve all SINC members (which will be a *lot*, so use sparingly) */
const fetchMembers = () => createApiAction(memberListUrl(), 'get', memberList);

/* Retrieve the user's profile information. */
const fetchProfile = () => createApiAction(ownProfileUrl(), 'get', ownProfileRetrieve);

/* Update a user. */
const updateMember = (user) => createApiAction(memberDetailUrl(user.id), 'post', memberUpdate, user);

/* Update the user's own profile. */
const updateOwnProfile = (user) => createApiAction(memberDetailUrl(user.id), 'patch', ownProfileUpdate, user);

export {
  addMember,
  fetchMember,
  fetchMembers,
  fetchProfile,
  updateMember,
  updateOwnProfile,
};
