const defaultState = '';

export default (state = defaultState, action) => {
    switch(action.type) {
        case "SEARCH_BOOKMARKS":
            return action.payload;
        default:
            return state;
    }
};