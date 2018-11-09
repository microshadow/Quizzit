import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import WelcomeScreen from "./welcomeScreen.js";
import LogInScreen from "./logInScreen.js";
import Dashboard from "./dashboard.js";
import SignUpScreen from "./signUpScreen.js";
import { GradeChart } from "./gradeChart.js";
import { StudentSummaryChart } from "./studentSummaryChart.js";
import { STUDENT } from "./globals.js";


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
                    <Route path="/:course/:quiz/gradeChart" component={GradeChart}/>
                    <Route path="/:course/:quiz/studentSummary" render={
                      (props) => <StudentSummaryChart userType={userType} {...props}/>
                    }/>
                    <Route path="/dashboard" exact render={() => <Dashboard userType={STUDENT}/>} />
                </Switch>
            </HashRouter>
        );
    }
}

export default Router;
