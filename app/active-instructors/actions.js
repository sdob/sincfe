import { createApiAction } from '../api';
import { activeInstructorListUrl } from '../api/urls';
import {
  regionActiveInstructorList,
} from './types';

const fetchActiveInstructors = rid => createApiAction({
  url: activeInstructorListUrl(rid),
  method: 'get',
  types: regionActiveInstructorList,
});

export default fetchActiveInstructors;
