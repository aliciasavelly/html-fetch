import React, { Component } from 'react';
import axios from 'axios';
import TagInfo from './TagInfo';
import _ from 'lodash';
import { Mark } from 'mark.js';

class WebsiteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      website: '',
      tags: {},
      error: '',
      newTags: false,
      sortedTags: [],
      doc: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateWebsite = this.updateWebsite.bind(this);
    this.addTags = this.addTags.bind(this);
    this.renderData = this.renderData.bind(this);
    this.handleMark = this.handleMark.bind(this);
  }

  // renderOther() {
  //   return (
  //     <div>OTHER!!</div>
  //   );
  // }

  renderData(doc) {
    // debugger;
    if (!doc.children) {
      return <div></div>;
    }

    // const { doc } = this.state;
    const children = doc.children;
    const len = children.length;
    if (len <= 0) return;
    // debugger;

    const jsx = (<div className="html-data-content">
                   {_.times(len, i => (
                      <div key={`${i}`} className="outer">
                        <div key={`tag-${children[i].tagName}-${i}`} className={`${children[i].tagName}`}>{`<${children[i].tagName}>${children[i].content}`}</div>
                        {this.renderData(children[i])}
                        <div key={`tag-${children[i].tagName}-${i}-end`}>{`</${children[i].tagName}>`}</div>

                      </div>
                     )
                   )}
                 </div>);
                 //  this.renderData(children[i]);
    // debugger;
    // return;

    // for (let i = 0; i < len; i++) {
    //   // const currentTag = children[i].tagName;
    //   //
    //   // tags[currentTag] = tags[currentTag] ? tags[currentTag] + 1 : 1;
    //   //
    //   // this.addTags(children[i], tags);
    // }

    return jsx;
  }

  handleSubmit(e) {
    e.preventDefault();
    // debugger;
    let website = this.state.website;
    const self = this;

    if (website.slice(0, 3) === "www") {
      website = "https://" + website;
    }

    axios.get(`http://cors.io/?${website}`)
         .then( responseData => {
           let data = responseData.data;
           const parser = new DOMParser();
           const doc = parser.parseFromString(data, "text/html");
          //  data = data.replace(/(<[^/])/g, "\n$1");
          //  debugger;

           this.setState({ doc });

           const tags = {};
           self.addTags(doc, tags);
          //  self.renderData(doc);

           let sortedTags = Object.keys(tags).sort( (a, b) => (tags[b]-tags[a]));

           this.setState({ tags, error: '', newTags: true, sortedTags, data });
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

  handleMark(e) {
    let tag = e.target.innerText.match(/(.+):/)[1];
    // let regex = new RegExp(`<${tag}( [^>]*/>|/>)`, "g");
    let regex2 = new RegExp(`<${tag}( [^>]*>|>)`, "g");
    let regex3 = new RegExp(`</${tag}>`, "g");
    let mark = new window.Mark(".data-section");

    if (e.target.classList.value.slice(0, 6) !== "marked") {
      e.target.classList.value = "marked " + e.target.classList.value;

      // var regex = new RegExp(`<${tag}( |[>])[^>]*>`, "g");
      // mark.markRegExp(regex);
      // var regex2 = new RegExp(`</${tag}( |[>])[^>]*>`, "g");
      // mark.markRegExp(regex2);
      // var regex3 = new RegExp(`<${tag}( |[/>])[^/]*[^>]*/>`, "g");
      // mark.markRegExp(regex3);
      // mark.markRegExp(regex);
      mark.markRegExp(regex2);
      mark.markRegExp(regex3);

    } else {
      e.target.classList.value = e.target.classList.value.slice(7);
      mark.unmark({ element: `${tag}` });
    }


    // let data = this.state.data;
    // data = data.replace(regex, `<span className="marked"><${tag}></span>`);
    // this.setState({ data });
  }

  render() {
    const { tags, error, newTags, sortedTags, data } = this.state;

    return(
      <div className="website-search">
        <form className="website-form" onSubmit={this.handleSubmit} onChange={this.updateWebsite}>
          <label>Search website:
            <input type="text" name="website"></input>
          </label>

          <input type="submit" value="Search"></input>
        </form>

        <p className="error">{error}</p>

        <TagInfo tags={tags} newTags={newTags} sortedTags={sortedTags} handleMark={this.handleMark} />

        <p className="data-section">{data}</p>
      </div>
    )
  }
}

export default WebsiteSearch;
