import React, { Component } from 'react';

class TagInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: {}
    }
  }

  componentWillReceiveProps(newProps) {
    if (Object.keys(newProps.tags).length > 0) {
      this.setState({ tags: newProps.tags });
    }
  }

  renderTags() {
    return(
      <div className="tags-index">
        {Object.keys(this.state.tags).map( (tag, idx) => (
          <p>{tag.toLowerCase()}: {this.state.tags[tag]}</p>
        ))}
      </div>
    )
  }

  render() {
    debugger;

    return(
      <div>
        {this.renderTags()}
      </div>
    )
  }
}

export default TagInfo;
