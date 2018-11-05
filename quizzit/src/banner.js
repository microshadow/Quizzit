import React, { Component } from 'react';
import './style/banner.css';
import { userType } from './globals.js';


function bannerBorder(thickness) {
  let style = {"height": thickness};
  return <div class="dividerDark" style={style}></div>;
}


class Banner extends Component {
  constructor(props) {
    super(props);

    this.getLoginButton = this.getLoginButton.bind(this);
    this.getStatsLink   = this.getStatsLink.bind(this);
  }

  makeLogo() {
    return (
      <div id="mainLogo"
           style={{"width": "280px","background-color": "black", "color": "white", "font-family": "Helvetica", "font-weight": "bold", "font-size": "2rem", "line-height": "74px", "text-align": "center"}}>
        Logo Goes Here
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
        { bannerBorder(6) }
      </div>
    );
  }
}

export default Banner;
