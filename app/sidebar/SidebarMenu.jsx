import React from 'react';

/* eslint-disable jsx-a11y/href-no-hash */
export default function SidebarMenu(props) {
  const { menuId, menuTitle } = props;
  return (
    <nav className="navbar navbar-inverse navbar-toggleable-sm sinc-sidebar__section">
      <button
        className="navbar-toggler navbar-toggler-right sinc-sidebar__toggler"
        type="button"
        data-target={`#${menuId}`}
        data-toggle="collapse"
        aria-controls={menuId}
        aria-expanded="false"
        aria-label="Toggle menu"
      >
        <i className="fa fa-fw fa-bars" />
      </button>
      <h2 className="navbar-brand sinc-sidebar__header" href="#">
        {menuTitle}
      </h2>
      <div className="collapse navbar-collapse" id={menuId}>
        <ul className="nav flex-column sinc-sidebar__menu-items">
          {props.children}
        </ul>
      </div>
    </nav>
  );
}
/* eslint-enable jsx-a11y/href-no-hash */
