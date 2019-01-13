import LocalApi from "./../apis/local"

export const setAuthToken = (token) => {
    sessionStorage.setItem("token", token);

    return {
        type: "AUTH_TOKEN",
        payload: token
    };
};

export const removeAuthToken = () => {
    sessionStorage.clear();

    return {
        type: "DEL_TOKEN",
        payload: null
    };
};

export const searchBookmarks = (searchTerm) => {
    return {
        type: "SEARCH_BOOKMARKS",
        payload: searchTerm
    }
}

//// Can't use async and await in actions, so we must use redux-middleware ////
export const fetchBookmarks = (searchTerm) => {
    return async (dispatch, getState) => {
        let response = await LocalApi.get("/bookmarks");
        let searchedResponse = response.data.filter((bookmark) => bookmark.title.includes(searchTerm));

        dispatch({
            type: "BOOKMARKS_LIST",
            payload: searchedResponse
        });
    }
};

export const createBookmark = ({title, url}) => {
    return async (dispatch, getState) => {
        title = title.toLowerCase();
        let response = await LocalApi.post("/bookmarks", {title, url});

        dispatch({
            type: "BOOKMARKS_LIST",
            payload: response.data
        });
    }
};

export const deleteBookmark = (id) => {
    return async (dispatch, getState) => {
        let response = await LocalApi.delete(`/bookmarks/${id}`);

        dispatch({
            type: "BOOKMARKS_LIST",
            payload: response.data
        });
    }
};

export const editBookmark = (id) => {
    return async (dispatch, getState) => {
        let response = await LocalApi.get(`/bookmarks/${id}`);

        dispatch({
            type: "EDIT_BOOKMARK",
            payload: response.data
        })
    }
}

export const updateBookmark = (bookmark) => {
    return async (dispatch, getState) => {
        const { id, title, url } = bookmark;
        let response = await LocalApi.put(`/bookmarks/${id}`, {title, url});

        dispatch({
            type: "BOOKMARKS_LIST",
            payload: response.data
        })
        dispatch({
            type: "EDIT_BOOKMARK",
            payload: false
        })
    }
}