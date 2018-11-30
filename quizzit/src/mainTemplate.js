import React, { Component } from 'react';

import Banner from './banner.js';
import Sidebar from './sidebar.js';

class Template extends Component {
  render() {
    const userType = this.props.userType;

    return (
      <div id="appContainer" className="d-flex flex-column">
        <Banner userType={userType}/>
        <div id="pageContentRow" className="d-flex align-items-stretch flex-grow-1">
          <Sidebar userType={userType}/>
          <div id="pageContentWrapper" className="flex-grow-1">
            <div id="pageContent">
              { this.props.children }
            </div>
            <div id="pageContentShadow">
            </div>
          </div>
        </div>
        <div id="footer">
        </div>
      </div>
    )
  }
}

export default Template;
