import React from 'react';

/* eslint-disable jsx-a11y/href-no-hash */
export default function SidebarMenu(props) {
  return (
    <div className="sinc-sidebar__section">
      <div className="sinc-sidebar__header">
        <h2>
          <a
            className="hidden-md-up sinc-sidebar__collapse-button"
            data-target={`#${props.menuId}`}
            data-toggle="collapse"
            href="#"
          >
            {props.menuTitle}
            <i className="fa fa-bars float-xs-right" />
          </a>
          <span className="hidden-sm-down">
            {props.menuTitle}
          </span>
        </h2>
      </div>
      <ul id={props.menuId} className="collapse nav sinc-sidebar__menu">
        {props.children}
      </ul>
    </div>
  );
}
/* eslint-enable jsx-a11y/href-no-hash */
