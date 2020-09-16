import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../actions";

class PostsShow extends Component {
  componentDidMount() {
    //const id = this.props.match.params.id;
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }
  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }
  render() {
    const { post } = this.props;
    console.log(post);
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/">Back To Index</Link>

        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories:{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}
//function mapStateToProps({ posts }, ownProps) {
// function mapStateToProps(state, ownProps) {
//this.props===ownProps;
// console.log("IN mapstateto props");
// console.log(posts);
//posts.map((post1) => console.log(post1));
// for (const post1 in posts) {
//   for (const post2 in post1) {
//     console.log(`${post2}: ${post1[post2]}`);
//   }
// }
// console.log("ownProps.match.params.id: " + ownProps.match.params.id);
//const post = posts[ownProps.match.params.id];
//console.log("post:" + post);
// const post = posts[321982];
// return post;
//return { post: posts[ownProps.match.params.id] };
//}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

//export default connect(null, { fetchPost })(PostsShow);
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
