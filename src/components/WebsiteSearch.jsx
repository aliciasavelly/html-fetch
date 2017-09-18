import React, { Component } from 'react';
import axios from 'axios';
import TagInfo from './TagInfo';
import _ from 'lodash';
import { Mark } from 'mark.js';

export default class WebsiteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      website: '',
      tags: {},
      sortedTags: [],
      data: '',
      error: '',
      newTags: false,
      regex: []
    }

    this.updateWebsite = this.updateWebsite.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTags = this.addTags.bind(this);
    this.handleMark = this.handleMark.bind(this);
  }

  updateWebsite(e) {
    this.setState({ website: e.target.value, newTags: false });
  }

  handleSubmit(e) {
    e.preventDefault();

    let website = this.state.website;
    const self = this;

    if (website.slice(0, 3) === 'www') {
      website = 'https://' + website;
    }

    axios.get(`http://cors.io/?${website}`)
         .then( responseData => {
           const data = responseData.data;
           const parser = new DOMParser();
           const doc = parser.parseFromString(data, 'text/html');

           const tags = {};
           self.addTags(doc, tags);

           let sortedTags = Object.keys(tags).sort( (a, b) => (tags[b]-tags[a]));

           this.setState({ tags, sortedTags, data, error: '', newTags: true });
         })
         .catch( error => {
           console.log(error);
           this.setState({
             tags: {},
             sortedTags: [],
             data: '',
             error: 'Unable to fetch the HTML for this page. Please input the full address for this web page.',
             newTags: true
           });
         });
  }

  addTags(doc, tags) {
    const children = doc.children;
    const len = children.length;
    if (len <= 0) return;

    for (let i = 0; i < len; i++) {
      const currentTag = children[i].tagName;

      tags[currentTag] = tags[currentTag] ? tags[currentTag] + 1 : 1;

      this.addTags(children[i], tags);
    }
  }

  handleMark(e) {
    const tag = e.target.innerText.match(/(.+):/)[1];
    const mark = new window.Mark('.data-section');
    const regex1 = new RegExp(`<${tag}( [^>]*>|>)`, 'g');
    const regex2 = new RegExp(`</${tag}>`, 'g');
    const targetVal = e.target.classList.value;

    if (targetVal.slice(0, 6) !== 'marked') {
      e.target.classList.value = 'marked ' + targetVal;

      mark.markRegExp(regex1);
      mark.markRegExp(regex2);

      const newRegex = [regex1, regex2];
      this.setState({ regex: this.state.regex.concat(newRegex) });

    } else {
      e.target.classList.value = targetVal.slice(7);

      mark.unmark();

      const reg = this.state.regex;
      for (let i = 0; i < reg.length; i++) {
        const idx = String(reg[i]).indexOf(`${tag}`);
        if (idx === -1) {
          mark.markRegExp(reg[i]);
        } else {
          reg.splice(i, 1);
          i--;
        }
      }

      this.setState({regex: reg });
    }
  }

  render() {
    const { tags, error, newTags, sortedTags, data } = this.state;

    return (
      <div className="website-search">
        <div className="top-nav">
          <img
            src="https://res.cloudinary.com/sharebnb/image/upload/v1505718841/favicon_nysktn.png"
            className="fetch-logo"
            alt="dog-logo" />

          <form className="website-form" id="form" onSubmit={this.handleSubmit} onChange={this.updateWebsite}>
            <label>Search website:
              <input type="text" name="website" className="search" />
            </label>

            <input type="submit" value="Search" id="input-button" />
          </form>
        </div>

        <p className="error">{error}</p>

        <TagInfo
          tags={tags}
          newTags={newTags}
          sortedTags={sortedTags}
          handleMark={this.handleMark} />

        <p className="data-section">{data}</p>
      </div>
    );
  }
}
