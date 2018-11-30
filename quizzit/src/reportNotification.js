import React, { Component } from 'react';

import Notification from './dashboardNotification.js';
import ProgressBar from './progressBar.js';
import { STUDENT, createHorizontalDivider, createVerticalDivider } from './globals.js';


class ReportNotification extends Component {
  render() {
    const avgReportText = this.props.userType === STUDENT
                            ? "My Grade"
                            : "Class Average";
    return (
      <Notification title={this.props.title}
                    href={this.props.href}
        >
        <div className="notificationGenerals d-flex flex-column">
          <ProgressBar percent={this.props.average}>
            {avgReportText}
          </ProgressBar>
          { createHorizontalDivider(8, "background-light") }
          <div className="notificationDescription flex-grow-1">
            {this.props.description}
          </div>
        </div>
        { createVerticalDivider(32, "background-light")}
        <div className="notificationStats">
          {this.props.children}
        </div>
      </Notification>
    );
  }
}

export default ReportNotification;
