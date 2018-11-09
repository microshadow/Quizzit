import React, { Component } from 'react';

import { createHorizontalDivider } from './globals.js';

class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboardNote">
        { createHorizontalDivider(6, "detail-light") }
        <div className="notification">
          <a href={this.props.href}>
            <h5>
              {this.props.title}
            </h5>
          </a>
          { createHorizontalDivider(2, "background-medium") }
          <div className="notificationBody d-flex">
            {this.props.children}
          </div>
        </div>
        { createHorizontalDivider(6, "detail-light") }
      </div>
    );
  }
}

export default Notification;
