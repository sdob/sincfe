import moment from 'moment';

/*
 * Helper function for formatting dates of birth to meet Django's
 * expectations
 */
function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

export {
  formatDate,
};
