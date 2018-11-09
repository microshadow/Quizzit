import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
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
                    <Route path="/:course/:quizNum/gradeChart" render={
                      (props) => <GradeChart userType={userType} {...props}/>
                    }/>
                    <Route path="/:course/studentSummary" render={
                      (props) => <StudentSummaryChart userType={userType} {...props}/>
                    }/>
                    <Route path="/dashboard" exact render={() => <Dashboard userType={EDUCATOR}/>} />
                    <Route path="/dashboardStudent" exact render={()=><Dashboard userType={STUDENT}/>} />
                    <Route path="/dashboardAdmin" exact render={()=><Dashboard userType={ADMIN}/>} />
                    <Route path="/dashboardEducator" exact render={()=><Dashboard userType={EDUCATOR}/>} />
                    <Route path="/createQuiz" exact component={CreateQuizPage}/>
                    <Route path="/answerPage" exact component={AnswerPage}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default Router;
