import React, { Component } from 'react';
import axios from 'axios';

import Template from './mainTemplate.js';
import ReportNotification from './reportNotification.js';
import EventNotification from './eventNotification.js';
import ProgressBar from './progressBar.js';
import { STUDENT, createVerticalDivider, getAuthorizedUser } from './globals.js';

import './style/dash.css';
import './style/sidebar.css';
import './style/banner.css';
import './style/index.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      userType: null,
      notifications: []
    };

    this.getNotifications = this.getNotifications.bind(this);
    this.packageEventNotification  = this.packageEventNotification.bind(this);
    this.packageReportNotification = this.packageReportNotification.bind(this);
    this.packageNotification = this.packageNotification.bind(this);
  }

  getNotifications() {
    const user = getAuthorizedUser();

    axios.get(`/api/notifications/${user._id}`).then((response) => {
      const newState = {
        userType: user.userType,
        name: user.first + " " + user.last,
        notifications: response.data.notifications
      }

      this.setState(newState);
    })
  }

  packageEventNotification(notification) {
    if (this.state.userType === STUDENT) {
      notification.href = `#/answerPage/${notification.data.subject}`;
    } else {
      notification.href = `#/createQuiz/${notification.data.subject}`;
    }

    return (
      <EventNotification title={notification.data.title}
                         description={notification.data.description}
                         href={notification.href}
                         meta={notification.data.extra}
                         userType={this.props.userType}
      />
    );
  }

  packageReportNotification(notification) {
    console.log("One")
    const hrefBase = `#/${notification.data.subject}/${notification.data.series}`;
    if (this.state.userType === STUDENT) {
      notification.href = `${hrefBase}/grades`;
    } else {
      notification.href = `${hrefBase}/overview`;
    }

    const firstThreeQuestions = notification.extra.questions.length > 3
                                ? notification.extra.questions.slice(0, 3)
                                : notification.extra.questions;

    const children = firstThreeQuestions.map((question) => (
      <ProgressBar percent={100 * question.score / question.question.weight}>
        {question.question.display}
      </ProgressBar>
    ));

    return (
      <ReportNotification title={notification.data.title}
                          description={notification.data.description}
                          href={notification.href}
                          average={notification.extra.average}
                          userType={this.props.userType}
        >
        {children}
      </ReportNotification>
    );
  }

  packageNotification(notification) {
    const noteData = notification.data;
    const title = `${noteData.subject} Quiz ${noteData.series}: ${noteData.title}`;

    delete noteData.series;
    noteData.title = title;

    if (notification.type === "event") {
      return this.packageEventNotification(notification);
    } else if (notification.type === "report") {
      return this.packageReportNotification(notification);
    }
  }

  componentDidMount() {
    this.getNotifications();
  }

  render() {
    const notifications = this.state.notifications;
    console.log("LLLLLLLLLLL", notifications);
    const notificationElements = notifications.map(this.packageNotification);

    return (
      <div>
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
      </div>
    );
  }
}

export default Dashboard;
