var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { userType, createHorizontalDivider } from './globals.js';

var Banner = function (_Component) {
  _inherits(Banner, _Component);

  function Banner(props) {
    _classCallCheck(this, Banner);

    var _this = _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).call(this, props));

    _this.makeLogo = _this.makeLogo.bind(_this);
    _this.getLoginButton = _this.getLoginButton.bind(_this);
    _this.getStatsLink = _this.getStatsLink.bind(_this);
    return _this;
  }

  _createClass(Banner, [{
    key: 'makeLogo',
    value: function makeLogo() {
      return React.createElement(
        'div',
        { id: 'mainLogo',
          style: {
            "width": "280px",
            "backgroundColor": "black",
            "color": "white",
            "fontFamily": "Helvetica",
            "fontWeight": "bold",
            "fontSize": "2rem",
            "lineHeight": "74px",
            "textAlign": "center"
          } },
        'Logo Goes Here'
      );
    }
  }, {
    key: 'getLoginButton',
    value: function getLoginButton() {
      var loggedIn = 'loggedIn' in this.props ? this.props.loggedIn : false;
      var buttonText = loggedIn ? "Log In" : "Log Out";

      return React.createElement(
        'a',
        { href: '#' },
        React.createElement(
          'div',
          { id: 'logButton', className: 'linkButton qButton textshadow' },
          buttonText
        )
      );
    }
  }, {
    key: 'getStatsLink',
    value: function getStatsLink() {
      return React.createElement(
        'div',
        { id: 'statsButton', className: 'linkButton qButton textshadow' },
        'My Stats'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'banner-container' },
        React.createElement(
          'div',
          { id: 'banner', className: 'd-flex justify-content-between align-items-center' },
          this.makeLogo(),
          React.createElement(
            'div',
            { className: 'links d-flex justify-content-end' },
            React.createElement(
              'div',
              { id: 'homeButton', className: 'linkButton qButton textshadow' },
              'Home'
            ),
            this.getStatsLink(),
            this.getLoginButton()
          )
        ),
        createHorizontalDivider(6, "detail-dark")
      );
    }
  }]);

  return Banner;
}(Component);

export default Banner;