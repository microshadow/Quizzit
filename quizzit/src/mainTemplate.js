import React, { Component } from 'react';
import axios from 'axios';
import Banner from './banner.js';
import Sidebar from './sidebar.js';
import { getAuthorizedUser } from './globals.js';
const globals = require('./globals.js');


class Template extends Component {
  constructor(props) {
    super(props);

    const user = getAuthorizedUser();
    this.state = {
      userType: user ? user.userType : null,
      loggedIn: user,
      courses: this.props.courses
    }
    this.activeQuizzes = [];
  }

  componentDidMount() {
    const user = getAuthorizedUser();
  }

  render() {
    const userType = this.state.userType;
    const loggedIn = this.state.loggedIn;
    console.log("update mainTemplate");
    console.log(this.props.courses);
    return (
      <div id="appContainer" className="d-flex flex-column">
        <Banner userType={userType} isLoggedIn={loggedIn}/>
        <div id="pageContentRow" className="d-flex align-items-stretch flex-grow-1">
          {this.props.courses &&
            <Sidebar userType={userType} courses={this.props.courses} activeQuizzes={this.activeQuizzes}/>
          }
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
