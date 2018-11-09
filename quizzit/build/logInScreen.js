var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var LogInScreen = function (_Component) {
    _inherits(LogInScreen, _Component);

    function LogInScreen(props) {
        _classCallCheck(this, LogInScreen);

        var _this = _possibleConstructorReturn(this, (LogInScreen.__proto__ || Object.getPrototypeOf(LogInScreen)).call(this, props));

        _this.logIn = _this.logIn.bind(_this);
        return _this;
    }

    _createClass(LogInScreen, [{
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
                    React.createElement(
                        "button",
                        { onClick: this.logIn },
                        "Log In"
                    )
                )
            );
        }
    }]);

    return LogInScreen;
}(Component);

export default LogInScreen;