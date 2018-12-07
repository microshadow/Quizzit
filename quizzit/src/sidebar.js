import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { STUDENT, EDUCATOR, ADMIN, createVerticalDivider,
         getAuthorizedUser } from './globals.js';
import './style/sidebar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.constructCourseMenu = this.constructCourseMenu.bind(this);
    this.getCourseDropdownLinks = this.getCourseDropdownLinks.bind(this);
    this.getCourseListComponent = this.getCourseListComponent.bind(this);
  }

  getCourseDropdownLinks(course) {
    const links = [];

    if (this.props.userType === STUDENT) {
      if (course.previousQuiz) {
        links.push({
          "text": "View History",
          "href": `/${course.previousQuiz}/grades`
        })
      }

      if (course.activeQuiz) {
        links.push({
          "text": "Take Quiz",
          "href": `/answerPage/${course._id}`
        });
      }

      return links;
    } else if (this.props.userType === "E") {
      let firstOp = {}
      if (course.activeQuiz) {
        firstOp["text"] = "Open Quiz";
        firstOp["href"] = `${course.activeQuiz}/`;
      } else {
        firstOp["text"] = "Create Quiz";
        firstOp["href"] = `/createQuiz/${course._id}`;
      }

      links.push(firstOp);
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

  constructCourseMenu(course, parentID) {
    const controllerID   = `${course.courseCode}Ctrl`;
    const targetID       = `${course.courseCode}Menu`;
    const targetSelector = `#${targetID}`;
    const parentSelector = `#${parentID}`;

    console.log(controllerID)
    console.log(targetID)
    console.log(targetSelector)
    console.log(parentSelector)

    var linkMeta = this.getCourseDropdownLinks(course);
    console.log("Printing Link Meta")
    console.log(linkMeta)
    const linkComponents = linkMeta.map((linkInfo) => {
      if (linkInfo.href) {
        return (
          <a class="dropdown-item" href={linkInfo.href}>{linkInfo.text}</a>
        )
      }
    });

    return (
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {course.courseCode}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {linkComponents}
        </div>
      </div>
    )
  }

  getCourseListComponent() {
    const courses = this.props.courses;
    const parentId = "coursesMenu";

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
