import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";
import _ from "lodash";
import { Link, NavLink } from "react-router-dom";

class PostIndex extends React.Component {
  componentDidMount() {
    //console.log("componentDidMount posts: " + this.props.fetchPosts());
    this.props.fetchPosts();
  }
  renderPosts() {
    //console.log("renderPosts method" + this.props.posts);
    return _.map(this.props.posts, (post) => {
      return (
        <li key={post.id} className="list-group-item">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }

  render() {
    //console.log("render function posts: " + this.props.posts);
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">{this.renderPosts()}</ul>
        <div></div>
      </div>
    );
  }
}
// function mapStateToProps({ posts }) {
//   return posts;
// }

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostIndex);
