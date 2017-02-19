import React from 'react';

import DeletableInstructorField from './DeletableInstructorField';
import InstructorInput from './InstructorInput';

export default function CourseInstructionListForm(props) {
  const { courseInstructions, onAdd, onRemove, ...rest } = props;

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
