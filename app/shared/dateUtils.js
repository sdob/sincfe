import moment from 'moment';

/*
 * Helper function for formatting dates of birth to meet Django's
 * expectations
 */
function date2django(date) {
  // console.info('date2django');
  console.info('date2django');
  console.info(moment(date).format('YYYY-MM-DD'));
  return moment(date).format('YYYY-MM-DD');
}

function django2date(str) {
  return moment(str, 'YYYY-MM-DD');
}

export {
  date2django,
  django2date,
};
