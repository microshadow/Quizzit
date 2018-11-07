var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import Template from './mainTemplate.js';
import ReportNotification from './reportNotification.js';
import EventNotification from './eventNotification.js';
import ProgressBar from './progressBar.js';
import { STUDENT, createHorizontalDivider, createVerticalDivider } from './globals.js';

var Dashboard = function (_Component) {
  _inherits(Dashboard, _Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));

    _this.state = { name: "Daniel" };

    _this.getNotifications = _this.getNotifications.bind(_this);
    _this.packageEventNotification = _this.packageEventNotification.bind(_this);
    _this.packageReportNotification = _this.packageReportNotification.bind(_this);
    _this.packageNotification = _this.packageNotification.bind(_this);
    return _this;
  }

  _createClass(Dashboard, [{
    key: 'getNotifications',
    value: function getNotifications() {
      return [{
        type: "event",
        data: {
          title: "ICS2P1 Quiz 2: String Parsing",
          description: "Description of quiz goes here...",
          href: "#",
          meta: {
            numQuestions: 12,
            numStudents: 27
          }
        }
      }, {
        type: "event",
        data: {
          title: "MPM1D3 Quiz 1: Set Theory",
          description: "Description of quiz goes here...",
          href: "#",
          meta: {
            numQuestions: 8,
            numStudents: 23
          }
        }
      }, {
        type: "report",
        data: {
          title: "SNC1D3 Quiz 4: Matter and the Elements",
          description: "Description of quiz goes here...",
          href: "#",
          average: 97.57,
          questions: [{
            name: "Question 5",
            score: 24.31
          }, {
            name: "Question 2",
            score: 41.20
          }, {
            name: "Question 3",
            score: 47.84
          }]
        }
      }];
    }
  }, {
    key: 'packageEventNotification',
    value: function packageEventNotification(notification) {
      return React.createElement(EventNotification, { title: notification.title,
        description: notification.description,
        href: notification.href,
        meta: notification.meta,
        userType: this.props.userType
      });
    }
  }, {
    key: 'packageReportNotification',
    value: function packageReportNotification(notification) {
      var firstThreeQuestions = notification.questions.slice(0, 3);
      var children = firstThreeQuestions.map(function (question) {
        return React.createElement(
          ProgressBar,
          { percent: question.score },
          question.name
        );
      });

      return React.createElement(
        ReportNotification,
        { title: notification.title,
          description: notification.description,
          href: notification.href,
          average: notification.average,
          userType: this.props.userType
        },
        children
      );
    }
  }, {
    key: 'packageNotification',
    value: function packageNotification(notification) {
      if (notification.type === "event") {
        return this.packageEventNotification(notification.data);
      } else if (notification.type === "report") {
        return this.packageReportNotification(notification.data);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var notifications = this.getNotifications();
      var notificationElements = notifications.map(this.packageNotification);

      return React.createElement(
        Template,
        { userType: this.props.userType },
        React.createElement(
          'div',
          { id: 'dashHeader', className: 'd-inline-flex align-items-stretch' },
          createVerticalDivider(12, "detail-light"),
          createVerticalDivider(6, "background-light"),
          React.createElement(
            'div',
            { id: 'dashWelcomeContainer' },
            React.createElement(
              'h1',
              { id: 'dashWelcome', className: 'stdFont textshadow' },
              'Welcome back, ',
              this.state.name,
              '! Here\'s what\'s new.'
            )
          ),
          createVerticalDivider(6, "background-light"),
          createVerticalDivider(12, "detail-light")
        ),
        notificationElements
      );
    }
  }]);

  return Dashboard;
}(Component);

export default Dashboard;