import React from 'react';
import { DateTimePicker } from 'react-widgets';

export default function DTP({ input, meta, value, ...rest }) {
  return (
    <DateTimePicker
      {...input}
      time={true}
      defaultValue={null}
      value={value}
      onBlur={() => input.onBlur(value)}
      {...rest}
    />
  );
}
