import * as fields from './fields';

export default function validate(values) {
  const errors = {};
  const requiredFields = [
    fields.TITLE,
    fields.FIRST_NAME,
    fields.LAST_NAME,
    fields.GENDER,
    fields.DATE_OF_BIRTH,
    fields.EMAIL,
  ];
  requiredFields.forEach((field) => {
    if (values[field] === undefined) {
      errors[field] = 'This field may not be blank.';
    }
  });

  // Handle selects
  const requiredSelects = [fields.TITLE, fields.GENDER];
  requiredSelects.forEach((field) => {
    if (values[field] === undefined || values[field] < 0) {
      errors[field] = 'This field may not be blank.';
    }
  });
  return errors;
}
