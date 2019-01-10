import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./../styles/App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import BookmarksPage from "./pages/BookmarksPage";
import PrivateRoute from "./PrivateRoute";
import { removeAuthToken } from "./../actions"
import { connect } from "react-redux";

class App extends Component {
    render() {
        const { token, removeAuthToken } = this.props; 

        return (
            <BrowserRouter>
                <div>
                    {token && <h4>User is logged in!</h4>}
                    {token && <button onClick={() => {removeAuthToken()}}>Logout</button>}
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <PrivateRoute eact path="/bookmarks" component={BookmarksPage} />
                        {/* By having the notfoundpage component below, if none of the above routes are matched, it will display the not found page */}
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps, {
    removeAuthToken
})(App);
