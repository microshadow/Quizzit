import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { STUDENT, createHorizontalDivider,
         registerAuthToken, getAuthorizedUser,
         trashAuthToken } from './globals.js';
import bannerImage from './media/QuizzitLogoHorizontal.png';
import './style/banner.css';


class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      userType: null
    };

    this.logOut = this.logOut.bind(this);
    this.makeLogo  = this.makeLogo.bind(this);
    this.getLoginButton = this.getLoginButton.bind(this);
    this.getStatsLink   = this.getStatsLink.bind(this);
  }

  makeLogo() {
    return (
      <img src={bannerImage} id="mainLogo"
           alt="Quizzit Logo"/>
    );
  }

  logOut() {
    trashAuthToken();
  }

  getLoginButton() {
    const loggedIn = this.state.isLoggedIn;
    const buttonText = loggedIn ? "Log Out" : "Log In";

    const href = loggedIn ? "/" : "/dashboard"
    const onClickFunc = loggedIn ? trashAuthToken : null;

    return (
      <Link to={href} onClick={onClickFunc}>
        <div id="logButton" className="linkButton qButton textshadow">
          { buttonText }
        </div>
      </Link>
    );
  }

  getStatsLink() {
    if (this.props.userType === STUDENT) {
      const user = getAuthorizedUser();
      const userId = user._id;
      const href = `/summary/${userId}`;

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

  componentDidMount() {
    const user = getAuthorizedUser;
    const initialState = {
      isLoggedIn: getAuthorizedUser() !== null,
      userType: user === null ? null : user.userType
    }

    this.setState(initialState);
  }

  render() {
    console.log("Render");
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
