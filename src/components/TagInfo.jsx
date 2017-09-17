import React, { Component } from 'react';

class TagInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: {},
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
    return(
      <div className="tags-index">
        {this.props.sortedTags.map( (tag, idx) => (
          <p key={`tag-${idx}`} className="tag">{tag.toLowerCase()}: {tags[tag]}</p>
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
