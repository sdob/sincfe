import React from 'react';
import { DateTimePicker } from 'react-widgets';

// eslint-disable-next-line no-unused-vars
export default function DatePicker({ input, meta, ...rest }) {
  const formats = [
    'YYYY-MM-DD',
  ];

  let value;
  if (input.value) {
    value = new Date(input.value);
  }
  return (
    <DateTimePicker
      {...input}
      format="DD/MM/YYYY"
      editFormat="DD/MM/YYYY"
      value={value}
      time={false}
      defaultValue={null}
      onBlur={onBlur}
      onChange={onChange}
      {...rest}
    />
  );

  function onBlur(...args) {
    // TODO: should we be handling this?
  }

  function onChange(date, str) {
    input.onBlur(date);
  }
}
