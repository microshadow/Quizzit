import React, { Component } from 'react';
import { AnswerPage } from './answerPage.js';
import { CreateQuizPage } from './createQuizPage.js';

class WelcomeScreen extends Component {

    render() {
        return (
            <div>
                <h1>Welcome to Quizzit</h1>
                <button>Log In</button>
                <button>Sign Up</button>
                <AnswerPage />
            </div>
        );
    }
}

export default WelcomeScreen;