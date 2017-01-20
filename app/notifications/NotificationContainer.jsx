import React from 'react';
import FlashNotification from './FlashNotification';
import * as clubTypes from '../clubs/types';
import * as profileTypes from '../profiles/types';

export default function NotificationContainer() {
  return (
    <div className="sinc-notification-container">
        <FlashNotification
          hideAfter={2000}
          message="Changes saved!"
          status="success"
          trigger={clubTypes.CLUB_UPDATE_SUCCESS}
        />
        <FlashNotification
          hideAfter={2000}
          message="Profile updated!"
          status="success"
          trigger={profileTypes.PROFILE_UPDATE_SUCCESS}
        />
    </div>
  );
}
