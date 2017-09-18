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
    }
  }

  renderTags() {
    const { tags } = this.state;

    if (Object.keys(tags).length === 0) {
      return(
        <div className="instructions">Enter the URL of a web page in the search bar above! The page's HTML will be loaded, and you can toggle which tags you'd like to be highlighted in the source code view.</div>
      )
    } else {
      return(
        <div className="tags-index">
          {this.props.sortedTags.map( (tag, idx) => (
            <p key={`tag-${idx}`} className="tag" onClick={this.props.handleMark}>{tag.toLowerCase()}: {tags[tag]}</p>
          ))}
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.renderTags()}
      </div>
    )
  }
}
