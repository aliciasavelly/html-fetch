import React, { Component } from 'react';

class TagInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: {},
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.newTags) {
      this.setState({ tags: newProps.tags });
    }
  }

  renderTags() {
    return(
      <div className="tags-index">
        {Object.keys(this.state.tags).map( (tag) => (
          <p key={`tag-${tag.toLowerCase()}`} className="tag">{tag.toLowerCase()}: {this.state.tags[tag]}</p>
        ))}
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.renderTags()}
      </div>
    )
  }
}

export default TagInfo;
