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
import * as profileTypes from '../profiles/types';

export default function NotificationContainer() {
  return (
    <div className="sinc-notification-container">
      <FlashNotification
        hideAfter={2000}
        message="Club created!"
        status="success"
        trigger={clubAdd.success}
      />
      <FlashNotification
        hideAfter={2000}
        message="Club deleted!"
        status="success"
        trigger={clubDelete.success}
      />
      <FlashNotification
        hideAfter={2000}
        message="Club updated!"
        status="success"
        trigger={clubUpdate.success}
      />
      <FlashNotification
        hideAfter={2000}
        message="Profile updated!"
        status="success"
        trigger={profileTypes.PROFILE_UPDATE_SUCCESS}
      />
      <FlashNotification
        hideAfter={2000}
        message="Member details updated!"
        status="success"
        trigger={profileTypes.UPDATE_MEMBER_SUCCESS}
      />
      <FlashNotification
        hideAfter={2000}
        message="Course added!"
        status="success"
        trigger={courseAdd.success}
      />
      <FlashNotification
        message="Course updated!"
        status="success"
        trigger={courseUpdate.success}
      />
      <FlashNotification
        hideAfter={2000}
        message="Course deleted!"
        status="success"
        trigger={courseDelete.success}
      />
      <FlashNotification
        hideAfter={2000}
        message="Instructor added!"
        status="success"
        trigger={courseInstructionAdd.success}
      />
      <FlashNotification
        hideAfter={2000}
        message="Instructor removed!"
        status="success"
        trigger={courseInstructionDelete.success}
      />
    </div>
  );
}
