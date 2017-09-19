import React, { Component } from 'react';

export default class TagInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: {}
    }

    this.renderTags = this.renderTags.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.newTags) {
      this.setState({ tags: newProps.tags });
      this.setState({ website: newProps.website });
    }
  }

  hashWebsite() {
    let hash = 0, i, chr;
    let site = this.state.website;

    if (site.length === 0) return hash;

    for (i = 0; i < site.length; i++) {
      chr   = site.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  };

  renderTags() {
    const { tags } = this.state;

    if (Object.keys(tags).length === 0) {
      return (
        <div className="instructions">
          Enter the URL of a web page in the search bar above! The page's HTML
          will be loaded, and you can toggle which tags you'd like to be
          highlighted in the source code view.</div>
      );
    } else {
      return (
        <div className="tags-index">
          {Object.keys(tags).map( (tag, idx) => (
            <p key={`tag-${idx}-${this.hashWebsite()}`} className="tag" id="tag" onClick={this.props.handleMark}>{tag.toLowerCase()}: {tags[tag]}</p>
          ))}
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderTags()}</div>;
  }
}
