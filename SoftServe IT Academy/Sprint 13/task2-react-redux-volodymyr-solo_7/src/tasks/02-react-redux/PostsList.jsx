import React, {Component} from "react";
import {connect} from 'react-redux'
import PostListItem from './PostListItem'

// TODO Import `connect()`, write a `mapState()` function that extracts the
// TODO data this component needs, and default-export the connected component.
function mapState(state){
    return {
        posts: state.posts,
        authors: state.authors
    }
}

export class PostsList extends Component {
    render() {
        const {posts = [], authors = []} = this.props;

        // TODO Bonus: convert the list items into a separate `<PostListItem> component, and connect it.
        // TODO        Be sure to pass the post ID as a prop, and access it using `ownProps` in `mapState`.
        // TODO        Bonus task is not tested, so you can experiment

        const postListItem = posts.map(post => {
            return <PostListItem id={post.id}/>
        })

        return (
            <div>
                <h4>Posts</h4>
                <ul>
                    {postListItem}
                </ul>
            </div>
        );
    }
}


export default connect(mapState)(PostsList);
