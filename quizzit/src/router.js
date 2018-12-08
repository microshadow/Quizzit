import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
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
import { STUDENT, EDUCATOR, ADMIN, getAuthorizedUser } from "./globals.js";
import Template from './mainTemplate.js';
import CreateCourse from "./createCourse.js";
import AddStudentPage from "./addStudentPage.js";
import Backend from './backend.js';
import { withRouter } from "react-router";

const globals = require("./globals.js");

let userType = STUDENT;
function setUserType(newUserType) {
  userType = newUserType;
}

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={WelcomeScreen}/>
                    <Route path="/login" exact render={
                        (props) => <LogInScreen {...props}/>
                    }/>
                    <Route path="/signUp" exact render={
                        (props) => <SignUpScreen {...props}/>
                    }/>
                    <LoggedInPages />
                </Switch>
            </BrowserRouter>
        );
    }
}

class LoggedInPagesInner extends Component {
    constructor(props){
        super(props);
        this.backend = new Backend();
        globals.course_data.data = [];
        globals.course_data.data = this.backend.get_course_data();
    }

    render() {
        const user = getAuthorizedUser();
        if(!user){
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
                <Template userType={user.userType} loggedIn={true}>
                    <Switch>
                        <Route path="/:quizId/grades" render={
                            (props) => <StudentQuizResults {...props}/>
                        }/>
                        <Route path="/:quizId/overview" render={
                            (props) => <ClassQuizResults {...props}/>
                        }/>
                        <Route path="/summary/:studentId" render={
                            (props) => <StudentSummary {...props}/>
                        }/>
                        <Route path="/dashboard" exact render={() => <Dashboard userType={user.userType}/>} />
                        <Route path="/createQuiz/:course_id" component={CreateQuizPage}/>
                        <Route path="/answerPage/:course_id" component={AnswerPage}/>
                        <Route path="/createCourse" render={
                            (props) => <CreateCourse {...props}/>
                        }/>
                        <Route path="/addStudentPage/:course_id" render={
                            (props) => <AddStudentPage {...props}/>
                        }/>
                    </Switch>
                </Template>
            </div>
        );
    }
}

const LoggedInPages = withRouter(LoggedInPagesInner);

export default Router;
