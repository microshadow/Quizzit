import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import WelcomeScreen from "./welcomeScreen.js";
import LogInScreen from "./logInScreen.js";
import Dashboard from "./dashboard.js";
import SignUpScreen from "./signUpScreen.js";
import CreateQuizPage from "./createQuizPage.js";
import AnswerPage  from "./answerPage.js"
import { GradeChart } from "./gradeChart.js";
import { StudentSummaryChart } from "./studentSummaryChart.js";
import { STUDENT, ADMIN, EDUCATOR } from "./globals.js";

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={WelcomeScreen}/>
                    <Route path="/logIn" exact component={LogInScreen}/>
                    <Route path="/signUp" exact component={SignUpScreen}/>
                    <Route path="/gradeChart" exact component={GradeChart}/>
                    <Route path="/studentSummary" exact component={StudentSummaryChart}/>
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
