import React from 'react';
import TagInfo from '../TagInfo';
import WebsiteSearch from '../WebsiteSearch';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import toJson from 'enzyme-to-json';

describe('TagInfo', () => {
  it('renders instructions when there are no tags', () => {
    const component = shallow(<TagInfo />);
    const tree = shallowToJson(component);

    expect(tree).toMatchSnapshot();
    expect(component.contains("Enter the URL of a web page in the search bar above! The page's HTML will be loaded, and you can toggle which tags you'd like to be highlighted in the source code view.")).toBe(true);
  })
  it('includes all tags', () => {
    const tags = {A: 32,ARTICLE: 6,BODY: 1,BUTTON: 7,DIV: 35,FOOTER: 1,FORM: 1,H1: 1,H2: 6,H3: 9,HEAD: 1,HEADER: 1,HR: 4,HTML: 1,I: 24,IMG: 5,INPUT: 4,LABEL: 3,LI: 27,LINK: 5,META: 3,NAV: 1,NOSCRIPT: 1,P: 46,SCRIPT: 7,SPAN: 7,STRONG: 11,TEXTAREA: 1,TITLE: 1,UL: 10};
    const sortedTags = ['P','DIV','A','LI','I','STRONG','UL','H3','SPAN','SCRIPT','BUTTON','ARTICLE','H2','IMG','LINK','HR','INPUT','META','LABEL','H1','HTML','NAV','BODY','HEAD','TITLE','FORM','HEADER','NOSCRIPT','TEXTAREA','FOOTER'];

    const component = mount(
      <TagInfo
        tags={tags}
        newTags={true}
        sortedTags={sortedTags}
        handleMark={WebsiteSearch.handleMark} />);

    const outerDiv = component.find('.tags-index');

    expect(outerDiv.root.component.props.props.tags).toBe(tags);
  })
});
