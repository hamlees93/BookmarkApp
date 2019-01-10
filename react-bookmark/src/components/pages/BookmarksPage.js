import React, { Component } from "react";
import BookmarkForm from "./../forms/BookmarkForm";
import BookmarkUpdateForm from "./../forms/BookmarkUpdateForm";
import { fetchBookmarks, deleteBookmark, updateBookmark } from "./../../actions";
import { connect } from "react-redux";

class BookmarksPage extends Component {
    componentDidMount() {
        //// Call an action creator to go off, get out data and hand off to our reducer. Redux will notice a change to state and will re-render /////
        //// The line below gives us access to the function fetchBookmarks from the properties. This is the one that has all extra pieces of functionality. If we did not have this line, it would just call the function without all redux attached ////
        const { fetchBookmarks } = this.props;
        fetchBookmarks();
    }

    render() {
        const { bookmarks, deleteBookmark, updateCurrentBookmark } = this.props;

        return (
            <div>
                <div>
                    <h2>New Bookmark</h2>
                    <BookmarkForm />
                </div>
                <div>
                    <h2>All Bookmarks</h2>
                    <ul>
                        {bookmarks.map(bookmark => {
                            return (
                                <li key={bookmark._id}>
                                    <a href={bookmark.url}>{bookmark.title}</a>
                                    <BookmarkUpdateForm bookmark={bookmark} />
                                    {/* <button onClick={() => <BookmarkUpdateForm bookmark={bookmark} />}>Edit</button> */}
                                    <button onClick={() => deleteBookmark(bookmark._id)}>Delete</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    };
};

///// Map redux state to component props. Pretty much gives us access to state, through props /////
const mapStateToProps = (state) => {
    return {
        bookmarks: state.bookmarks
    }
}

export default connect(mapStateToProps, {
    fetchBookmarks,
    deleteBookmark,
    updateBookmark
})(BookmarksPage);
