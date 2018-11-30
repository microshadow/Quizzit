import React, { Component } from 'react';

import { createHorizontalDivider } from './globals.js';

class Notification extends Component {
  render() {
    return (
      <div className="dashboardNote">
        { createHorizontalDivider(6, "detail-light") }
        <div className="blockTitle ml-4 mt-3 mb-4">
          <a className="font-dark" href={this.props.href}>
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
