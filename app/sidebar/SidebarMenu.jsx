import React from 'react';

export default function SidebarMenu(props) {
  console.info('Rendering SidebarMenu');
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
            <i className="fa fa-chevron-down float-xs-right" />
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
