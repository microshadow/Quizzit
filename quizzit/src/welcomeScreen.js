import React, { Component } from 'react';

class WelcomeScreen extends Component {

    render() {
        return (
            <div>
                <h1>Welcome to Quizzit</h1>
                <button>Log In</button>
                <button>Sign Up</button>
            </div>
        );
    }
}

export default WelcomeScreen;