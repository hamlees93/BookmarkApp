import axios from "axios";
// import JWT from "jsonwebtoken";
import store from "./../store"

//this creates an instance of axios that we can modify//
const LocalApi = axios.create({
    baseURL: "http://localhost:3000"
});

LocalApi.interceptors.request.use(function(config) {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
})

/////////// PRE-REDUX WAY OF DOING THINGS ////////////////
// LocalApi.setAuthHeader = function(token) {
//     this.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

// LocalApi.handleTokenError = function(callback) {
//     LocalApi.interceptors.request.use(function(config) {
//         const authHeader = config.headers.common.Authorization;

//         if (authHeader) {
//             const token = authHeader.split("Bearer ")[1];
//             const { exp } = JWT.decode(token);
//             const now = Date.now().valueOf() / 1000;

//             if (exp <= now) {
//                 callback();
//                 return Promise.reject("Token expired");
//             }
//         }

//         return config;
//     });
// };
//////////// END PRE-REDUX METHOD /////////

export default LocalApi;