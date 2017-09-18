import React from 'react';
import ReactDom from 'react-dom';
import TagInfo from '../TagInfo';
import WebsiteSearch from '../WebsiteSearch';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('WebsiteSearch', () => {
  it('includes TagInfo component', () => {
    const component = mount(<WebsiteSearch />);

    expect(component.find(TagInfo).length).toBe(1);
  })
  it('shows website search section', () => {
    const component = shallow(<WebsiteSearch />);
    const tree = shallowToJson(component);

    expect(tree).toMatchSnapshot();
  })
});
