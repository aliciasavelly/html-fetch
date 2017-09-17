import React, { Component } from 'react';
import axios from 'axios';
import TagInfo from './TagInfo';

class WebsiteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      website: '',
      tags: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateWebsite = this.updateWebsite.bind(this);
    this.addTags = this.addTags.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const website = this.state.website;
    const self = this;

    axios.get(`http://cors.io/?${website}`)
         .then( responseData => {
           const data = responseData.data;
           const parser = new DOMParser();
           const doc = parser.parseFromString(data, "text/html");

           const tags = {};
           self.addTags(doc, tags);
          //  debugger;
           this.setState({ tags });
         });
  }

  updateWebsite(e) {
    this.setState({ website: e.target.value });
  }

  addTags(doc, tags) {
    const children = doc.children;
    const len = children.length;
    if (len <= 0) return;

    for (let i = 0; i < len; i++) {
      const currentTag = children[i].tagName;

      if (tags[currentTag]) {
        tags[currentTag] += 1;
      } else {
        tags[currentTag] = 1;
      }

      this.addTags(children[i], tags);
    }
  }

  render() {
    return(
      <div className="website-search">
        <form className="website-form" onSubmit={this.handleSubmit} onChange={this.updateWebsite}>
          <label>Search website:
            <input type="text" name="website"></input>
          </label>
          <input type="submit" value="Search"></input>
        </form>
        <TagInfo tags={this.state.tags} />
      </div>
    )
  }
}

export default WebsiteSearch;
