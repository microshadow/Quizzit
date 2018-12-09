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
    this.activeQuizzes = []
  }

  componentDidMount() {
    const user = getAuthorizedUser();

    axios.get(`/api/courses/${user._id}`).then((response) => {
      console.log("Entering component didmount endpoint")
      const newState = {
        userType: user.userType,
        loggedIn: true,
        courses: response.data.courses
      };
      console.log(response.data.courses)
      
      this.setState(newState);
    })
    // .then(() => {
    //   this.state.courses.map((course) => {
    //     axios.get(`/api/quizzes/${course._id}`).then((response) => {
    //       console.log("entering quiz fetch")
    //       if (response.status < 400) {
    //         const currentActiveQuiz = response.data;
    //         console.log("Printing current active quiz")
    //         console.log(currentActiveQuiz)
    //         this.activeQuizzes.push(currentActiveQuiz)
    //       }
    //     })
    //     console.log(this.activeQuizzes)
    //   })
    // })

  }

  render() {
    const userType = this.state.userType;
    const loggedIn = this.state.loggedIn;
    console.log("PRINTIN QUIZZES IN MAIN TEMPLATE")
    this.state.courses.map((course) => {
      axios.get(`/api/quizzes/${course._id}`).then((response) => {
        console.log("entering quiz fetch")
        if (response.status < 400) {
          const currentActiveQuiz = response.data;
          console.log("Printing current active quiz")
          console.log(currentActiveQuiz)
          this.activeQuizzes.push(currentActiveQuiz)
        }
      })
      console.log(this.activeQuizzes)
    })
    console.log(this.activeQuizzes)

    return (
      <div id="appContainer" className="d-flex flex-column">
        <Banner userType={userType} isLoggedIn={loggedIn}/>
        <div id="pageContentRow" className="d-flex align-items-stretch flex-grow-1">
          {this.state.courses && this.activeQuizzes &&
            <Sidebar userType={userType} courses={this.state.courses} activeQuizzes={this.activeQuizzes}/>
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
