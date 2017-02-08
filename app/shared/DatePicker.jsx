import React from 'react';
import { DateTimePicker } from 'react-widgets';

// eslint-disable-next-line no-unused-vars
export default function DatePicker({ input, meta, value, ...rest }) {
  // const { value } = input;
  // const value = input.value || null;
  return (
    <DateTimePicker
      {...input}
      format="DD/MM/YYYY"
      time={false}
      defaultValue={null}
      value={value}
      onBlur={() => input.onBlur(value)}
      {...rest}
    />
  );
}
