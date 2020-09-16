import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostsNew extends React.Component {
  renderField(field) {
    const {
      meta: { touched, error },
    } = field;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <div>
          <input className="form-control" type="text" {...field.input} />
        </div>
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  onSubmit(values) {
    //this === component
    //console.log(values);

    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" component={this.renderField} label="Title" />
        <Field
          name="categories"
          component={this.renderField}
          label="Categories"
        />
        <Field
          name="content"
          component={this.renderField}
          label="Enter some content here"
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <Link to="/" className="btn btn-danger">
          Clear values
        </Link>
      </form>
    );
  }
}
function validate(values) {
  //validate funtion

  const errors = {};
  if (!values.title || values.title.length <= 3) {
    errors.title = "Please enter the title and of atleast 3 characters";
  }
  if (!values.category) {
    errors.category = "Please enter some Categories";
  }
  if (!values.content) {
    errors.content = "Please enter some Content";
  }

  return errors;
}

//export default PostsNew;
export default reduxForm({
  validate,
  form: "PostsNewForm", // a unique identifier for this form
})(connect(null, { createPost })(PostsNew));
