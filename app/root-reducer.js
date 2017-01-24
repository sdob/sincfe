// Import third-party reducers
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as notifications } from 'react-redux-notifications';

// Import reducers from modules
import activeInstructors from './active-instructors/reducers';
import auth from './auth/reducers';
import clubs from './clubs/reducers';
import courses from './courses/reducers';
import membershipStatus from './membership-history/reducers';
import profiles from './profiles/reducers';
import qualifications from './qualifications/reducers';
import regions from './regions/reducers';

// Combine our reducers and export
export default combineReducers({
  activeInstructors,
  auth,
  clubs,
  courses,
  form,
  membershipStatus,
  notifications,
  profiles,
  qualifications,
  regions,
});
