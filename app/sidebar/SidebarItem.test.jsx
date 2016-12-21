import React from 'react';
import SidebarItem from './SidebarItem';
import renderer from 'react-test-renderer';

test('Some assertion', () => {
  const component = renderer.create(
    <SidebarItem to="/path" text="Content" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
