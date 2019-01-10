import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import bookmarkListReducer from "./bookmark_list_reducer";
import editBookmarkReducer from "./edit_bookmark";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    auth: authReducer,
    bookmarks: bookmarkListReducer,
    edit: editBookmarkReducer,
    form: formReducer
});