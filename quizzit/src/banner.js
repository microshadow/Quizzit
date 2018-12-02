import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { STUDENT, createHorizontalDivider } from './globals.js';
import bannerImage from './media/QuizzitLogoHorizontal.png';
import './style/banner.css';


class Banner extends Component {
  constructor(props) {
    super(props);

    this.makeLogo = this.makeLogo.bind(this);
    this.getLoginButton = this.getLoginButton.bind(this);
    this.getStatsLink   = this.getStatsLink.bind(this);
  }

  makeLogo() {
    return (
      <img src={bannerImage} id="mainLogo"
           alt="Quizzit Logo"/>
    );
  }

  getLoginButton() {
    const loggedIn = 'loggedIn' in this.props
                        ? this.props.loggedIn
                        : false;
    const buttonText = loggedIn ? "Log In" : "Log Out";
    const link = loggedIn ? "/logIn" : "/";

    return (
      <Link to={link}>
        <div id="logButton" className="linkButton qButton textshadow">
          { buttonText }
        </div>
      </Link>
    );
  }

  getStatsLink() {

    if (this.props.userType === STUDENT) {
      const studentId = 1;
      let href = `/summary/${studentId}`;

      return (
        <Link to={href}>
          <div id="statsButton" className="linkButton qButton textshadow">
            My Stats
          </div>
        </Link>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div id="banner-container">
        <div id="banner" className="d-flex justify-content-between align-items-center">
          { this.makeLogo() }
          <div className="links d-flex justify-content-end">
            <Link to="/dashboard">
              <div id="homeButton" className="linkButton qButton textshadow">
                Home
              </div>
            </Link>
            { this.getStatsLink() }
            { this.getLoginButton() }
          </div>
        </div>
        { createHorizontalDivider(6, "detail-dark") }
      </div>
    );
  }
}

export default Banner;
