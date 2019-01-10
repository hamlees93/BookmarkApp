const defaultState = {
    token: sessionStorage.getItem("token") || null
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case "AUTH_TOKEN":
            // this clones the state, and updates the token value //
            return {...state, token: action.payload};
            ///// SHorthand for this ... /////
            // const newState = {...state};
            // newState.token = action.payload;
            ///// End shorthand /////
        case "DEL_TOKEN":
            return {...state, token: action.payload}
        default:
            return state;
    }
};