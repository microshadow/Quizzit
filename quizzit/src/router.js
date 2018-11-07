import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import WelcomeScreen from "./ScreenComponents/welcomeScreen.js";
import LogInScreen from "./ScreenComponents/logInScreen.js";
import Dashboard from "./dashboard.js";
import SignUpScreen from "./ScreenComponents/signUpScreen.js";
import { STUDENT } from "./globals.js";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={WelcomeScreen}/>
                    <Route path="/logIn" exact component={LogInScreen}/>
                    <Route path="/signUp" exact component={SignUpScreen}/>
                    <Route path="/dashboard" exact render={()=><Dashboard userType={STUDENT}/>} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;