import React from 'react';
import { DateTimePicker } from 'react-widgets';

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
