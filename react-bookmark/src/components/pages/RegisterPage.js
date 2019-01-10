import React, { Component } from "react";
import RegisterForm from "./../forms/RegisterForm";

class RegisterPage extends Component {
    render() {
        return(
            <div>
                <h1>Register a new user</h1>
                {/* This is just us passing it 2 levels deep, from app to this page to register form */}
                <RegisterForm onRegisterFormSubmit={this.props.onRegisterFormSubmit} />
            </div>
        );
    }
}

export default RegisterPage;