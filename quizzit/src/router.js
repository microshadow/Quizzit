import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import WelcomeScreen from "./welcomeScreen.js";
import LogInScreen from "./logInScreen.js";
import Dashboard from "./dashboard.js";
import SignUpScreen from "./signUpScreen.js";
import { STUDENT } from "./globals.js";

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={WelcomeScreen}/>
                    <Route path="/logIn" exact component={LogInScreen}/>
                    <Route path="/signUp" exact component={SignUpScreen}/>
                    <Route path="/dashboard" exact render={()=><Dashboard userType={STUDENT}/>} />
                </Switch>
            </HashRouter>
        );
    }
}

export default Router;
