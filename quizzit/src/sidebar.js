import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Backend from './backend.js';
import { STUDENT, EDUCATOR, ADMIN, createVerticalDivider,
         getAuthorizedUser } from './globals.js';
import './style/sidebar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const globals = require("./globals.js");

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.constructCourseMenu = this.constructCourseMenu.bind(this);
    this.getCourseDropdownLinks = this.getCourseDropdownLinks.bind(this);
    this.getCourseListComponent = this.getCourseListComponent.bind(this);
    this.backend = new Backend();
  }

  deleteCourse = (event, courseID) => {
    event.preventDefault();
    globals.course_data.data = this.backend.remove_course(courseID);
  }
  
  getCourseDropdownLinks(course) {
    const links = [];

    //console.log("Printing current active quizzes");
    //console.log(this.props.activeQuizzes)
    const activeQuizzes = this.props.activeQuizzes;
    var activeQuizBool = false;

    //console.log("PRINTING ACTIVE QUIZZES")
    //console.log(activeQuizzes[0])
    activeQuizzes.map((quiz) => {
      // console.log(quiz.course)
      // console.log(course._id)
      // if (quiz.course === course._id) {
      //   activeQuizBool = true;
      // }
      //("looping")
    })

    //console.log("ACTIVE QUIZ BOOL")
    //console.log(activeQuizBool)

    if (this.props.userType === STUDENT) {
      if (course.previousQuiz) {
        links.push({
          "text": "View History",
          "href": `/${course.previousQuiz}/grades`
        })
      }

      if (activeQuizBool) {
        links.push({
          "text": "Take Quiz",
          "href": `/answerPage/${course._id}`
        });
      }

      return links;
    } else if (this.props.userType === "E") {
      let firstOp = {}
      if (activeQuizBool) {
        firstOp["text"] = "Open Quiz";
        firstOp["href"] = `${course.activeQuiz}/`;
      } else {
        firstOp["text"] = "Create Quiz";
        firstOp["href"] = `/createQuiz/${course._id}`;
      }

      links.push(firstOp);
      const addStudentComponent = {
        text: "Add Student",
        href: `/addStudentPage/${course._id}`
      }
      links.push(addStudentComponent)
      if (course.previousQuiz) {
        links.push({
          "text": "Past Quizzes",
          "href": `/${course.previousQuiz}/overview`
        })
      }
    } else if (this.props.userType === ADMIN) {
      if (course.previousQuiz) {
        links.push({
          "text": "Past Quizzes",
          "href": `/${course.previousQuiz}/overview`
        })
      }
    }

    return links;
  }

  getCourseActiveQuiz(courseID) {

  }

  constructCourseMenu(course, parentID) {

    var linkMeta = this.getCourseDropdownLinks(course);

    const linkComponents = linkMeta.map((linkInfo) => {
      if (linkInfo.href) {
        return (
          <Link to={linkInfo.href}>
            <a className="dropdown-item">{linkInfo.text}</a>
          </Link>
        )
      }
    });

    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {course.courseCode}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {linkComponents}
        </div>
        <a href="#" onClick={(event) => {this.deleteCourse(event, course._id)}}> delete </a>
      </div>
    )
  }

  getCourseListComponent() {
    const courses = this.props.courses;
    const parentId = "coursesMenu";
    console.log(courses);
    const blank = !courses.length && this.props.userType === STUDENT;
    const baseComponents = blank ? (
        <div className="stdFont textshadow no-results px-4 mt-3">
          You are not in any courses right now. Contact an instructor
          or administrator to be added to a course.
        </div>
      ) : courses.map((course) => this.constructCourseMenu(course, parentId));

    if (this.props.userType !== STUDENT) {
      baseComponents.push((
        <Link to="/createCourse">
          <div id="addCourse" className="qButton courseLabel textshadow" >
            Add Courses
          </div>
        </Link>
      ))
    }

    return baseComponents;
  }

  render() {
    return (
      <div id="sidebarContainer" className="d-flex align-items-stretch">
        { createVerticalDivider(8, "detail-dark") }
        <div id="sidebar">
          <div id="coursesMenu">
            <div id="coursesHeader" className="textshadow">
              Courses
            </div>
            <div className="courseList accordion">
              { this.getCourseListComponent() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
