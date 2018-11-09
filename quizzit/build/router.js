var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import WelcomeScreen from "./welcomeScreen.js";
import LogInScreen from "./logInScreen.js";
import Dashboard from "./dashboard.js";
import SignUpScreen from "./signUpScreen.js";
import { STUDENT } from "./globals.js";

var Router = function (_Component) {
    _inherits(Router, _Component);

    function Router() {
        _classCallCheck(this, Router);

        return _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).apply(this, arguments));
    }

    _createClass(Router, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                BrowserRouter,
                null,
                React.createElement(
                    Switch,
                    null,
                    React.createElement(Route, { path: '/', exact: true, component: WelcomeScreen }),
                    React.createElement(Route, { path: '/logIn', exact: true, component: LogInScreen }),
                    React.createElement(Route, { path: '/signUp', exact: true, component: SignUpScreen }),
                    React.createElement(Route, { path: '/dashboard', exact: true, render: function render() {
                            return React.createElement(Dashboard, { userType: STUDENT });
                        } })
                )
            );
        }
    }]);

    return Router;
}(Component);

export default Router;