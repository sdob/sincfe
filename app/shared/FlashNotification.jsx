import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { InlineNotification } from 'react-redux-notifications';

export default function FlashNotification(props) {
  const { message, status, trigger } = props;

  const divClass = !!status ? `sinc-notification--${status}` : '';

  return (
    <InlineNotification
      defaultMessage={message}
      triggeredBy={trigger}
      hideAfter={2000}
      showDismiss
      renderNotification={(notification, dismiss) => (
        <div className="notification" key={notification.key}>
          {notification.message}
          {notification.showDismiss && <i className="notification_dismiss fa fa-fw fa-times" onClick={dismiss} />}
        </div>
      )}
      renderContainer={notifications => (
        <div className={divClass}>
          <ReactCSSTransitionGroup
            transitionName="alert"
            transitionEnterTimeout={80}
            transitionLeaveTimeout={200}
          >
            {notifications}
          </ReactCSSTransitionGroup>
        </div>
      )}
    />
  );
 }
