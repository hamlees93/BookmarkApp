import React, { Component } from "react";
import BookmarkForm from "./../forms/BookmarkForm";
import BookmarkUpdateForm from "./../forms/BookmarkUpdateForm";
import { fetchBookmarks, deleteBookmark, editBookmark, searchBookmarks } from "./../../actions";
import { connect } from "react-redux";

class BookmarksPage extends Component {
    state = {displayBookmarks: []}

    componentDidMount() {
        //// Call an action creator to go off, get out data and hand off to our reducer. Redux will notice a change to state and will re-render /////
        //// The line below gives us access to the function fetchBookmarks from the properties. This is the one that has all extra pieces of functionality. If we did not have this line, it would just call the function without all redux attached ////
        const { fetchBookmarks, search } = this.props;
        fetchBookmarks(search);
    }

    bookmarkSearchResults(searchTerm) {
        let { bookmarks: displayedBookmarks } = this.props; 
        this.setState({ displayBookmarks: displayedBookmarks.filter((bookmark) => bookmark.title.includes(searchTerm.toLowerCase())) });
    }

    render() {
        const { bookmarks, deleteBookmark, editBookmark, getBookmark, searchBookmarks, search } = this.props;

        return (
            
            <div>
                {!getBookmark ? (
                    <div>
                        <div>
                            <h2>New Bookmark</h2>
                            <BookmarkForm />
                        </div>
                        <div>
                            <h2>All Bookmarks</h2>
                            <input 
                                type="text" 
                                placeholder="Search Bookmarks"
                                onChange={(event) => {searchBookmarks(event.target.value); this.bookmarkSearchResults(event.target.value)}} 
                            />
                            {search ? (
                                <ul>
                                    {this.state.displayBookmarks.map(bookmark => {
                                        return (
                                            <li key={bookmark._id}>
                                                <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.title}</a>
                                                <button onClick={() => editBookmark(bookmark._id)}>Edit</button>
                                                <button onClick={() => deleteBookmark(bookmark._id)}>Delete</button>
                                            </li>
                                        );
                                    })}
                                </ul>
                                ) : (
                                <ul>
                                    {bookmarks.map(bookmark => {
                                        return (
                                            <li key={bookmark._id}>
                                                <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.title}</a>
                                                <button onClick={() => editBookmark(bookmark._id)}>Edit</button>
                                                <button onClick={() => deleteBookmark(bookmark._id)}>Delete</button>
                                            </li>
                                        );
                                    })}
                                </ul>
                                )}                                
                        </div>
                    </div>
                ) : (
                    <div><BookmarkUpdateForm bookmark={getBookmark} /></div>
                )}
            </div>

        );
    };
};

///// Map redux state to component props. Pretty much gives us access to state, through props /////
const mapStateToProps = (state) => {
    return {
        bookmarks: state.bookmarks,
        getBookmark: state.getBookmark,
        search: state.search
    }
}

export default connect(mapStateToProps, {
    fetchBookmarks,
    deleteBookmark,
    editBookmark, 
    searchBookmarks
})(BookmarksPage);
