var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import Notification from './dashboardNotification.js';
import ProgressBar from './progressBar.js';
import { STUDENT, createHorizontalDivider, createVerticalDivider } from './globals.js';

var ReportNotification = function (_Component) {
  _inherits(ReportNotification, _Component);

  function ReportNotification(props) {
    _classCallCheck(this, ReportNotification);

    return _possibleConstructorReturn(this, (ReportNotification.__proto__ || Object.getPrototypeOf(ReportNotification)).call(this, props));
  }

  _createClass(ReportNotification, [{
    key: 'render',
    value: function render() {
      var avgReportText = this.props.userType === STUDENT ? "My Grade" : "Class Average";
      return React.createElement(
        Notification,
        { title: this.props.title,
          href: this.props.href
        },
        React.createElement(
          'div',
          { className: 'notificationGenerals d-flex flex-column' },
          React.createElement(
            ProgressBar,
            { percent: this.props.average },
            avgReportText
          ),
          createHorizontalDivider(8, "background-light"),
          React.createElement(
            'div',
            { className: 'notificationDescription flex-grow-1' },
            this.props.description
          )
        ),
        createVerticalDivider(32, "background-light"),
        React.createElement(
          'div',
          { className: 'notificationStats' },
          this.props.children
        )
      );
    }
  }]);

  return ReportNotification;
}(Component);

export default ReportNotification;