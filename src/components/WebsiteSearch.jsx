import React, { Component } from 'react';
import axios from 'axios';

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

    axios.get(website)
         .then( responseData => {
           const data = responseData.data;
           const parser = new DOMParser();
           const doc = parser.parseFromString(data, "text/html");
           self.addTags(doc);
         });
  }

  updateWebsite(e) {
    this.setState({ website: e.target.value });
  }

  addTags(doc) {
    let children = doc.children;
    let len = children.length;
    if (len <= 0) return;
    let tags = this.state.tags;

    for (let i = 0; i < len; i++) {
      let currentTag = children[i].tagName;
      let stateCopy = Object.assign({}, this.state);

      if (tags[currentTag]) {
        stateCopy.tags[currentTag] += 1;
      } else {
        stateCopy.tags[currentTag] = 1;
      }
      this.setState(stateCopy);
      this.addTags(children[i]);
    }
    debugger;
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
      </div>
    )
  }
}

export default WebsiteSearch;
