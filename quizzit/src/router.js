import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import WelcomeScreen from "./welcomeScreen.js";
import LogInScreen from "./logInScreen.js";
import Dashboard from "./dashboard.js";
import SignUpScreen from "./signUpScreen.js";
import CreateQuizPage from "./createQuizPage.js";
import AnswerPage  from "./answerPage.js"
import ClassQuizResults from "./classQuizResults.js";
import StudentQuizResults from "./studentQuizResults.js";
import StudentSummary from './studentSummary.js';
import { STUDENT, EDUCATOR, ADMIN } from "./globals.js";


let userType = STUDENT;
function setUserType(newUserType) {
  userType = newUserType;
}

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={WelcomeScreen}/>
                    <Route path="/logIn" exact component={LogInScreen}/>
                    }/>
                    <Route path="/signUp" exact render={
                      () => <SignUpScreen setUserType={setUserType}/>
                    }/>
                    <Route path="/:course/:quizNum/grades" render={
                      (props) => <StudentQuizResults userType={userType} {...props}/>
                    }/>
                    <Route path="/:course/:quizNum/overview" render={
                      (props) => <ClassQuizResults userType={userType} {...props}/>
                    }/>
                    <Route path="/summary/:studentId" render={
                      (props) => <StudentSummary userType={userType} {...props}/>
                    }/>
                    <Route path="/dashboard" exact render={() => <Dashboard userType={EDUCATOR}/>} />
                    <Route path="/createQuiz" exact component={CreateQuizPage}/>
                    <Route path="/answerPage" exact component={AnswerPage}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default Router;
