import React, { Component } from 'react';
import axios from 'axios';

import Banner from './banner.js';
import Sidebar from './sidebar.js';
import { getAuthorizedUser } from './globals.js';

class Template extends Component {
  constructor(props) {
    super(props);

    const user = getAuthorizedUser();
    this.state = {
      userType: user ? user.userType : null,
      loggedIn: user,
      courses: []
    }
  }

  componentDidMount() {
    const user = getAuthorizedUser();
    console.log(user, user._id);
    console.log("Entered place for courses to be set");
    axios.get(`/api/courses/${user._id}`).then((response) => {
      console.log("PRINTING COURSE LIST:");
      console.log(response.data.courses);
      const newState = {
        userType: user.userType,
        loggedIn: true,
        courses: response.data.courses
      };

      this.setState(newState);
    });
  }

  render() {
    const userType = this.state.userType;
    const loggedIn = this.state.loggedIn;

    return (
      <div id="appContainer" className="d-flex flex-column">
        <Banner userType={userType} isLoggedIn={loggedIn}/>
        <div id="pageContentRow" className="d-flex align-items-stretch flex-grow-1">
          <Sidebar userType={userType} courses={this.state.courses}/>
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
