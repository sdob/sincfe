import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { InlineNotification } from 'react-redux-notifications';

const DEFAULT_HIDE_AFTER = 2000;

/* eslint-disable jsx-a11y/href-no-hash */
export default function FlashNotification(props) {
  const { hideAfter, message, status, trigger } = props;

  const divClass = `sinc-notification--${status || 'success'}`;

  return (
    <InlineNotification
      defaultMessage={message}
      hideAfter={hideAfter || DEFAULT_HIDE_AFTER}
      triggeredBy={trigger}
      showDismiss
      renderNotification={(notification, dismiss) => (
        <div className="notification" key={notification.key}>
          {notification.message}
          {notification.showDismiss && (
            <a href="#" onClick={dismiss} className="notification_dismiss">
              <i className="fa fa-fw fa-times" />
            </a>
          )}
        </div>
      )}
      renderContainer={notifications => (
        <div className={divClass}>
          <ReactCSSTransitionGroup
            transitionName="alert"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            {notifications}
          </ReactCSSTransitionGroup>
        </div>
      )}
      {...props}
    />
  );
}
/* eslint-enable jsx-a11y/href-no-hash */
