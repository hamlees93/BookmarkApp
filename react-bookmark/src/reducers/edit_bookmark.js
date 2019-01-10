const defaultState = false;

export default (state = defaultState, action) => {
    switch(action.type) {
        case "EDIT_BOOKMARK":
            return action.payload;
        default:
            return state;
    }
};