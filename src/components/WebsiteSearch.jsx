import React, { Component } from 'react';
import axios from 'axios';
import TagInfo from './TagInfo';

class WebsiteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      website: '',
      tags: {},
      error: '',
      newTags: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateWebsite = this.updateWebsite.bind(this);
    this.addTags = this.addTags.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.setState({ tags: {} });
    // debugger;

    let website = this.state.website;
    const self = this;

    if (website.slice(0, 3) === "www") {
      website = "https://" + website;
    }

    axios.get(`http://cors.io/?${website}`)
         .then( responseData => {
           const data = responseData.data;
           const parser = new DOMParser();
           const doc = parser.parseFromString(data, "text/html");

           const tags = {};
           self.addTags(doc, tags);
           this.setState({ tags, error: '', newTags: true });
         })
         .catch( error => {
           console.log(error);
           this.setState({
             error: 'Unable to fetch the HTML for this page. Please input the full address for this web page.',
             tags: {},
             newTags: true
           })
         });
  }

  updateWebsite(e) {
    this.setState({ website: e.target.value, newTags: false });
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

  render() {
    const { tags, error } = this.state;

    return(
      <div className="website-search">
        <form className="website-form" onSubmit={this.handleSubmit} onChange={this.updateWebsite}>
          <label>Search website:
            <input type="text" name="website"></input>
          </label>

          <input type="submit" value="Search"></input>
        </form>

        <p className="error">{error}</p>

        <TagInfo tags={tags} newTags={this.state.newTags} />
      </div>
    )
  }
}

export default WebsiteSearch;
