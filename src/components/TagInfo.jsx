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
    // {Object.keys(this.state.tags).map( (tag) => (
    //   <p key={`tag-${tag.toLowerCase()}`} className="tag">{tag.toLowerCase()}: {this.state.tags[tag]}</p>
    // ))}
    // const { sortedTags } = this.props;
    return(
      <div className="tags-index">
        {this.props.sortedTags.map( (tag, idx) => {
          // debugger;
          return (
            <p key={`tag-${idx}`} className="tag">{tag.toLowerCase()}: {this.state.tags[tag]}</p>
          )
        })}
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
