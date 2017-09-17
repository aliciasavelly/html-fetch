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
    // debugger;
    axios.get(website)
         .then( responseData => {
           const data = responseData.data;
           const parser = new DOMParser();
           const doc = parser.parseFromString(data, "text/html");
           debugger;
           self.addTags(doc);
         });
  }

  updateWebsite(e) {
    this.setState({ website: e.target.value });
  }

  addTags(doc) {
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
