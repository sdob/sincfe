import React from 'react';
import DatePicker from 'react-datepicker';

export default function renderDatePicker({ input, placeholder, defaultValue, meta: { touched, error } }) {
  const dateFormat = 'DD/MM/YYYY';
  return (
      <DatePicker
        {...input}
        className="form-control"
        dateFormat={dateFormat}
        placeholderText={dateFormat}
        showMonthDropdown={true}
        showYearDropdown={true}
        selected={input.value ? moment(input.value, dateFormat) : null}
      />
  );
}
