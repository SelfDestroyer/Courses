import React, { Component } from "react";
import { connect } from "react-redux";

function mapState(state, ownProps) {
  return {
    authors: state.authors,
    posts: state.posts,
    id: ownProps.id,
  };
}

export class PostListItem extends Component {
  render() {
    const { posts = [], authors = [], id } = this.props;

    const post = posts.map((post) => {
      const author = authors.find(
        (author) => author.authorId === post.authorId
      ) || { name: "Unknown" };
      const { name } = author;
      if (post.id === id) {
        return (
          <li key={id}>
            {post.title} by {name}
          </li>
        );
      }
    });

    return <>{post}</>;
  }
}

export default connect(mapState)(PostListItem);
