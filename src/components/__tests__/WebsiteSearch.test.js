import React from 'react';
import TagInfo from '../TagInfo';
import WebsiteSearch from '../WebsiteSearch';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('WebsiteSearch', () => {
  const shallowComponent = shallow(<WebsiteSearch />);
  const component = mount(<WebsiteSearch />);

  it('includes TagInfo component', () => {
    expect(component.find(TagInfo).length).toBe(1);
  });

  it('shows website search section', () => {
    const tree = shallowToJson(shallowComponent);

    expect(tree).toMatchSnapshot();
  });

  it('changes website prop when user types in search bar', () => {
    const websiteInput = component.find('input[type="text"]');
    websiteInput.simulate('change', { target: { value: 'https://aliciasavelly.github.io/portfolio/' }});

    expect(component.state().website).toEqual('https://aliciasavelly.github.io/portfolio/');
  });
});
