import React from 'react';
import { DateTimePicker } from 'react-widgets';

// eslint-disable-next-line no-unused-vars
export default function DatePicker({ input, meta,  ...rest }) {
  const { name, value } = input;
  return (
    <DateTimePicker
      {...input}
      format="DD/MM/YYYY"
      time={false}
      value={new Date((value || null))}
      onBlur={() => input.onBlur(value)}
      {...rest}
    />
  );
}
