import * as fields from './fields';

export default function validate(values) {
  const DEFAULT_REQUIRED = 'This field cannot be blank.';
  const DEFAULT_REQUIRED_SELECT = 'You must choose one.';
  const errors = {};
  // Contact name, email, and phone can all be dealt with the same way
  const requiredFields = [
    fields.NAME,
    fields.CONTACT_EMAIL,
    fields.CONTACT_NAME,
    fields.CONTACT_PHONE,
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = DEFAULT_REQUIRED;
    }
  });
  // Region is required, too --- if left blank, it evaluates to -1
  [fields.REGION].forEach((field) => {
    if (values[field] < 0) {
      errors[field] = DEFAULT_REQUIRED_SELECT;
    }
  });
  return errors;
}
