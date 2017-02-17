import * as fields from './fields';

export default function validate(values) {
  const requiredSelects = [
    fields.REGION,
    fields.CERTIFICATE,
  ];

  const errors = {};
  requiredSelects.forEach((field) => {
    if (values[field] < 0) {
      errors[field] = 'You must choose one.';
    }
  });

  return errors;
}
