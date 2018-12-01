import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import WelcomeScreen from "./welcomeScreen.js";
import LogInScreen from "./logInScreen.js";
import Dashboard from "./dashboard.js";
import SignUpScreen from "./signUpScreen.js";
import CreateQuizPage from "./createQuizPage.js";
import AnswerPage  from "./answerPage.js"
import { GradeChart } from "./GradeChart.js";
import { StudentSummaryChart } from "./StudentSummaryChart.js";
import { STUDENT, EDUCATOR, ADMIN } from "./globals.js";
import Template from './mainTemplate.js';

let userType = STUDENT;
function setUserType(newUserType) {
  userType = newUserType;
}

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" exact component={LogInScreen}/>
                    <Route path="/signUp" exact render={
                            () => <SignUpScreen setUserType={setUserType}/>
                        }/>
                    <LoggedInPages />
                </Switch>
            </HashRouter>
        );
    }
}

class LoggedInPages extends Component {
    render() {
        const notLoggedIn = false;
        if(notLoggedIn){
            console.log(this.props);
            return (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                    }}
                />
            );
        }
        return (
            <div>
                <Template userType={STUDENT} loggedIn={true}>
                    <Switch>
                        <Route path="/" exact component={WelcomeScreen}/>
                        <Route path="/gradeChart/:course/:quizNum" render={
                            (props) => <GradeChart userType={userType} {...props}/>
                        }/>
                        <Route path="/studentSummary/:course" render={
                            (props) => <StudentSummaryChart userType={userType} {...props}/>
                        }/>
                        <Route path="/dashboard" exact render={() => <Dashboard userType={STUDENT}/>} />
                        <Route path="/createQuiz" exact component={CreateQuizPage}/>
                        <Route path="/answerPage/:course_id" exact component={AnswerPage}/>
                    </Switch>
                </Template>
            </div>
        );
    }
}

export default Router;
