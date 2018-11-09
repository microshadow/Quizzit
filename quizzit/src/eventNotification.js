import React, { Component } from 'react';

import Notification from './dashboardNotification.js';
import { createVerticalDivider } from './globals.js';


class EventNotification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const exclaimedTitle = `ACTIVE - ${this.props.title}`;

    return (
      <Notification title={exclaimedTitle}
                    href={this.props.href}
        >
        <div className="notificationExtras">
          {this.props.children}
        </div>
        <div className="notificationDescription">
          {this.props.description}
        </div>
        { createVerticalDivider(12, "background-light")}
        <div className="notificationMeta">
          Number of Questions: <span className="figure">{this.props.meta.numQuestions}</span>
          <br/>
          Number of Students Writing: <span className="figure">{this.props.meta.numStudents}</span>
        </div>
      </Notification>
    )
  }
}

export default EventNotification;
