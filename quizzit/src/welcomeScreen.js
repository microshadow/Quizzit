import React, { Component } from 'react';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.goToLogIn = this.goToLogIn.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
    }

    goToLogIn() {
        this.props.history.push("/logIn");
    }

    goToSignUp() {
        this.props.history.push("/signUp");
    }

    render() {
        return (
            <div>
                <h1>Welcome to Quizzit</h1>
                <button onClick={this.goToLogIn}>Log In</button>
                <button onClick={this.goToSignUp}>Sign Up</button>
            </div>
        );
    }
}

export default WelcomeScreen;