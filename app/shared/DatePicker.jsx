import React from 'react';
import { DateTimePicker } from 'react-widgets';

// eslint-disable-next-line no-unused-vars
export default function DatePicker({ input, meta, value, ...rest }) {
  return (
    <DateTimePicker
      {...input}
      format="DD/MM/YYYY"
      value={value}
      time={false}
      onBlur={() => input.onBlur(value)}
      {...rest}
    />
  );
}
