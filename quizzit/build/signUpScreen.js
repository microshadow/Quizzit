var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var SignUpScreen = function (_Component) {
    _inherits(SignUpScreen, _Component);

    function SignUpScreen(props) {
        _classCallCheck(this, SignUpScreen);

        var _this = _possibleConstructorReturn(this, (SignUpScreen.__proto__ || Object.getPrototypeOf(SignUpScreen)).call(this, props));

        _this.logIn = _this.logIn.bind(_this);
        return _this;
    }

    _createClass(SignUpScreen, [{
        key: "logIn",
        value: function logIn() {
            this.props.history.push("/dashboard");
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "Login" },
                React.createElement(
                    "form",
                    null,
                    React.createElement("input", { type: "text", placeholder: "Username", name: "uname" }),
                    React.createElement("br", null),
                    React.createElement("input", { type: "password", placeholder: "Password", name: "pword" }),
                    React.createElement("br", null),
                    React.createElement("input", { type: "password", placeholder: "Confirm Password", name: "confirmpword" }),
                    React.createElement("br", null),
                    React.createElement(
                        "select",
                        null,
                        React.createElement(
                            "option",
                            { value: "student" },
                            "Student"
                        ),
                        React.createElement(
                            "option",
                            { value: "teacher" },
                            "Teacher"
                        ),
                        React.createElement(
                            "option",
                            { value: "admin" },
                            "Admin"
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "button",
                        { onClick: this.logIn },
                        "Sign Up"
                    )
                )
            );
        }
    }]);

    return SignUpScreen;
}(Component);

export default SignUpScreen;