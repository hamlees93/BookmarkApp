import React, {Component} from "react";
import { connect } from "react-redux";
import { createBookmark } from "./../../actions";
import { reduxForm, Field } from "redux-form";

const Input = ({input, meta, type}) => {
    return (
        <div>
            <input {...input} type={type} />
            <div>{meta.touched && meta.error}</div>
        </div>
    )
}

class BookmarkForm extends Component {
    onFormSubmit = async (formValues) => {
        const { title, url } = formValues;
        const { createBookmark, reset } = this.props;
        createBookmark({ title, url });
        reset();
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <Field
                        type="text"
                        name="title"
                        component={Input}
                    />
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <Field
                        type="text"
                        name="url"
                        component={Input}
                    />
                </div>
                <div>
                    <input type="submit" value="Create New Bookmark" />
                </div>
            </form>
        );
    };
};

const WrappedBookmarkForm = reduxForm({
    form: "bookmark",
    ////If this function returns an empty object, the form is valid////
    validate: ({ title, url}) => {
        const errors = {};

        if (!title) {
            errors.title = "Title is required!"
        }

        if (!url) {
            errors.url = "URL is required!"
        }

        return errors;
    }
})(BookmarkForm);

export default connect(null, {
    createBookmark
})(WrappedBookmarkForm);