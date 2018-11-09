import React, { Component } from 'react';

import Template from './mainTemplate.js';
import ReportNotification from './reportNotification.js';
import EventNotification from './eventNotification.js';
import ProgressBar from './progressBar.js';
import { STUDENT, createHorizontalDivider, createVerticalDivider } from './globals.js';
import './style/dash.css';
import './style/sidebar.css';
import './style/banner.css';
import './style/progressBar.css';
import './style/index.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {name: "Daniel"};

    this.getNotifications    = this.getNotifications.bind(this);
    this.packageEventNotification  = this.packageEventNotification.bind(this);
    this.packageReportNotification = this.packageReportNotification.bind(this);
    this.packageNotification = this.packageNotification.bind(this);
  }

  getNotifications() {
    return [
      {
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
      },
      {
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
      },
      {
        type: "report",
        data: {
          title: "SNC1D3 Quiz 4: Matter and the Elements",
          description: "Description of quiz goes here...",
          href: "#",
          average: 97.57,
          questions: [
            {
              name: "Question 5",
              score: 24.31
            },
            {
              name: "Question 2",
              score: 41.20
            },
            {
              name: "Question 3",
              score: 47.84
            }
          ]
        }
      }
    ];
  }

  packageEventNotification(notification) {
    return (
      <EventNotification title={notification.title}
                         description={notification.description}
                         href={notification.href}
                         meta={notification.meta}
                         userType={this.props.userType}
      />
    );
  }

  packageReportNotification(notification) {
    const firstThreeQuestions = notification.questions.slice(0, 3);
    const children = firstThreeQuestions.map((question) => (
      <ProgressBar percent={question.score}>
        {question.name}
      </ProgressBar>
    ));

    return (
      <ReportNotification title={notification.title}
                          description={notification.description}
                          href={notification.href}
                          average={notification.average}
                          userType={this.props.userType}
        >
        {children}
      </ReportNotification>
    );
  }

  packageNotification(notification) {
    if (notification.type === "event") {
      return this.packageEventNotification(notification.data);
    } else if (notification.type === "report") {
      return this.packageReportNotification(notification.data);
    }
  }

  render() {
    const notifications = this.getNotifications();
    const notificationElements = notifications.map(this.packageNotification);

    return (
      <Template userType={this.props.userType}>
        <div id="dashHeader" className="d-inline-flex align-items-stretch">
          { createVerticalDivider(12, "detail-light") }
          { createVerticalDivider(6, "background-light") }
          <div id="dashWelcomeContainer">
            <h1 id="dashWelcome" className="stdFont textshadow">
              Welcome back, {this.state.name}! Here's what's new.
            </h1>
          </div>
          { createVerticalDivider(6, "background-light") }
          { createVerticalDivider(12, "detail-light") }
        </div>
        { notificationElements }
      </Template>
    );
  }
}

export default Dashboard;
