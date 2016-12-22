import React from 'react';
import renderer from 'react-test-renderer';
import SidebarItem from './SidebarItem';

test('Some assertion', () => {
  const component = renderer.create(
    <SidebarItem to="/path" text="Content" />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
