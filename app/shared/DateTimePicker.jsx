import React from 'react';
import { DateTimePicker } from 'react-widgets';

// eslint-disable-next-line no-unused-vars
export default function DTP({ input, meta, value, ...rest }) {
  return (
    <DateTimePicker
      {...input}
      time
      defaultValue={null}
      value={value}
      onBlur={() => input.onBlur(value)}
      {...rest}
    />
  );
}
