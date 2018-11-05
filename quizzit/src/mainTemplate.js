import React, { Component } from 'react';

import Banner from './banner.js';
import Sidebar from './sidebar.js';
import { STUDENT } from './globals.js';

class Template extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userType = this.props.userType;

    return (
      <div id="appContainer" className="d-flex flex-column">
        <Banner userType={userType}/>
        <div id="pageContentRow" className="d-flex align-items-stretch flex-grow-1">
          <Sidebar userType={userType}/>
          <div id="pageContent" className="flex-grow-1">
            { this.props.children }
          </div>
        </div>
        <div id="footer">
        </div>
      </div>
    )
  }
}

export default Template;
