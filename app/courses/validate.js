import * as fields from './fields';

export default function validate(values) {
  const requiredFields = [
    fields.REGION,
    fields.CERTIFICATE,
  ];

  const errors = {};
  requiredFields.forEach((field) => {
    if (!values[field] || values[field] < 0) {
      errors[field] = 'This field may not be blank.';
    }
  });

  return errors;
}
