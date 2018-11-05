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
        <Sidebar userType={userType}/>
        <div id="footer">
        </div>
      </div>
    )
  }
}

export default Template;
