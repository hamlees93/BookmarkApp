import React, {Component} from "react";
import { connect } from "react-redux";
import { updateBookmark } from "./../../actions";
import { reduxForm, Field } from "redux-form";

const Input = ({input, meta, type}) => {
    return (
        <div>
            <input {...input} type={type} />
            <div>{meta.touched && meta.error}</div>
        </div>
    )
}

class BookmarkUpdateForm extends Component {
    onFormSubmit = async (formValues) => {
        const { title, url } = formValues;
        const { updateBookmark, reset } = this.props;
        updateBookmark({ title, url });
        reset();
    }

    render() {
        const { handleSubmit, bookmark } = this.props
        const { title, url } = bookmark;

        return (
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <Field
                        type="text"
                        name="title"
                        // value={title}
                        component={Input}
                    />
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <Field
                        type="text"
                        name="url"
                        // value={url}
                        component={Input}
                    />
                </div>
                <div>
                    <input type="submit" value="Edit Bookmark" />
                </div>
            </form>
        );
    };
};

const WrappedBookmarkUpdateForm = reduxForm({
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
})(BookmarkUpdateForm);

export default connect(null, {
    updateBookmark
})(WrappedBookmarkUpdateForm);