import React from 'react';
import FlashNotification from './FlashNotification';
// import * as clubTypes from '../clubs/types';
import {
  clubAdd,
  clubDelete,
  clubUpdate,
} from '../clubs/types';
import {
  courseAdd,
  courseDelete,
  courseUpdate,
  courseInstructionAdd,
  courseInstructionDelete
} from '../courses/types';
import {
  qualificationAdd,
  qualificationDelete,
  qualificationUpdate,
} from '../qualifications/types';
import * as profileTypes from '../profiles/types';

export default function NotificationContainer() {
  return (
    <div className="sinc-notification-container">
      <FlashNotification
        message="Club created!"
        trigger={clubAdd.success}
      />
      <FlashNotification
        message="Club deleted!"
        trigger={clubDelete.success}
      />
      <FlashNotification
        message="Club updated!"
        trigger={clubUpdate.success}
      />
      <FlashNotification
        message="Profile updated!"
        trigger={profileTypes.PROFILE_UPDATE_SUCCESS}
      />
      <FlashNotification
        message="Member details updated!"
        trigger={profileTypes.UPDATE_MEMBER_SUCCESS}
      />
      <FlashNotification
        message="Course added!"
        trigger={courseAdd.success}
      />
      <FlashNotification
        message="Course updated!"
        trigger={courseUpdate.success}
      />
      <FlashNotification
        message="Course deleted!"
        trigger={courseDelete.success}
      />
      <FlashNotification
        message="Instructor added!"
        trigger={courseInstructionAdd.success}
      />
      <FlashNotification
        message="Instructor removed!"
        trigger={courseInstructionDelete.success}
      />
      <FlashNotification
        message="Qualification added!"
        trigger={qualificationAdd.success}
      />
      <FlashNotification
        message="Qualification deleted!"
        trigger={qualificationDelete.success}
      />
      <FlashNotification
        message="Qualification updated!"
        trigger={qualificationUpdate.success}
      />
    </div>
  );
}
