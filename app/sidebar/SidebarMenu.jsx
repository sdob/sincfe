import React from 'react';

export default function SidebarMenu(props) {
  console.info('Rendering SidebarMenu');
  return (
    <div className="sinc-sidebar__section">
      <div className="sinc-sidebar__header">
        <h2>
          {props.menuTitle}
          <a
            className="float-xs-right sinc-sidebar__collapse-button"
            data-target={`#${props.menuId}`}
            data-toggle="collapse"
            href="#"
          >
            <i className="fa fa-chevron-down" />
          </a>
        </h2>
      </div>
      <ul id={props.menuId} className="collapse nav sinc-sidebar__menu">
        {props.children}
      </ul>
    </div>
  );
}
