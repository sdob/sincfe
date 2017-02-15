import * as fields from './fields';

export default function validate(values) {
  const DEFAULT_REQUIRED = 'This field cannot be blank.';
  const errors = {};
  // Contact name, email, and phone can all be dealt with the same way
  [fields.NAME, fields.CONTACT_EMAIL, fields.CONTACT_NAME, fields.CONTACT_PHONE].forEach((field) => {
    if (!values[field]) {
      errors[field] = DEFAULT_REQUIRED;
    }
  });
  return errors;
}
