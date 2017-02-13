import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Autosuggest from 'react-autosuggest';

import DeletableInstructorField from './DeletableInstructorField';
import InstructorInput from './InstructorInput';

export default function CourseInstructionListForm(props) {
  const { className, courseInstructions, onAdd, onRemove, ...rest } = props;

  return (
    <div>
      {courseInstructions.map(instruction => (
        <DeletableInstructorField
          instruction={instruction}
          onClick={() => onRemove(instruction)}
          {...rest}
        />
      ))}
      <InstructorInput courseInstructions={courseInstructions} onAdd={onAdd} />
    </div>
  );
}
