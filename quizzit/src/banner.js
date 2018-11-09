import React, { Component } from 'react';

import { userType, createHorizontalDivider } from './globals.js';
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
      <div id="mainLogo"
           style={{
             "width": "150px",
             "color": "white",
             "fontFamily": "Helvetica",
             "fontSize": "2rem",
             "lineHeight": "74px",
             "textAlign": "center"
           }}>
        Quizzit
      </div>
    )
  }

  getLoginButton() {
    const loggedIn = 'loggedIn' in this.props
                        ? this.props.loggedIn
                        : false;
    const buttonText = loggedIn ? "Log In" : "Log Out";

    return (
      <a href="#">
        <div id="logButton" className="linkButton qButton textshadow">
          { buttonText }
        </div>
      </a>
    );
  }

  getStatsLink() {
    return (
      <div id="statsButton" className="linkButton qButton textshadow">
        My Stats
      </div>
    )
  }

  render() {
    return (
      <div id="banner-container">
        <div id="banner" className="d-flex justify-content-between align-items-center">
          { this.makeLogo() }
          <div className="links d-flex justify-content-end">
            <div id="homeButton" className="linkButton qButton textshadow">
              Home
            </div>
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
