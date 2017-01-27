import React from 'react';
import { FormRow } from '../shared';
import * as fields from './fields';

export default function ContactDetails() {
  return (
    <div>
      <FormRow required="true" field={fields.EMAIL} label="Email" />
      <FormRow field={fields.PHONE_HOME} label="Phone (home)" />
      <FormRow field={fields.PHONE_MOBILE} label="Phone (mobile)" />
      <FormRow field={fields.ADDRESS} component="textarea" rows="3" label="Address" />
      <FormRow field={fields.NEXT_OF_KIN_NAME} label="Next of kin" />
      <FormRow field={fields.NEXT_OF_KIN_PHONE} label="Next of kin (phone)" />
    </div>
  );
}
