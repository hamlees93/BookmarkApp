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

//// Can't use async and await in actions, so we must use redux-middleware ////
export const fetchBookmarks = () => {
    return async (dispatch, getState) => {
        let response = await LocalApi.get("/bookmarks");

        dispatch({
            type: "BOOKMARKS_LIST",
            payload: response.data
        });
    }
};

export const createBookmark = ({title, url}) => {
    return async (dispatch, getState) => {
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

export const updateBookmark = (id) => {
    return async (dispatch, getState) => {
        let response = await LocalApi.put(`/bookmarks/${id}`);

        dispatch({
            type: "BOOKMARKS_LIST",
            payload: response.data
        })
    }
}