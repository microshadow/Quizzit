import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { STUDENT, EDUCATOR, ADMIN, createVerticalDivider } from './globals.js';
import './style/sidebar.css';


class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.getMyCourses = this.getMyCourses.bind(this);
    this.constructCourseMenu = this.constructCourseMenu.bind(this);
    this.getCourseDropdownLinks = this.getCourseDropdownLinks.bind(this);
    this.getCourseListComponent = this.getCourseListComponent.bind(this);
  }

  getMyCourses() {
    return [
      {
        "name": "CSC309",
        "quiz": "answerPage"
      },
      {
        "name": "CSC302",
        "quiz": "answerPage"
      },
      {
        "name": "CSC367",
        "quiz": "answerPage"
      }];
  }

  getCourseDropdownLinks(course) {
    if (this.props.userType === STUDENT) {
      const links = [
        {
          "text": "View History",
          "href": `/studentSummary/${course.name}`
        }];

      if (course.quiz != null) {
        links.push({
          "text": "Take Quiz",
          "href": `/${course.quiz}/${course.name}`
        });
      }

      return links;
    } else if (this.props.userType === EDUCATOR) {
      let firstOp = {}
      if (course.quiz != null) {
        firstOp["text"] = "Open Quizzes";
        firstOp["href"] = `${course.quiz}/${course.name}/`;
      } else {
        firstOp["text"] = "Create Quiz";
        firstOp["href"] = "/createQuiz";
      }

      return [firstOp,
        {
          "text": "Past Quizzes",
          "href": `/gradeChart/${course.name}/`
        },
      ];
    } else if (this.props.userType === ADMIN) {
      return [
        {
          "text": "Edit Staff",
          "href": "#"
        },
        {
          "text": "View History",
          "href": `/gradeChart/${course.name}/`
        },
      ];
    }
  }

  constructCourseMenu(course, parentID) {
    const controllerID   = `${course.name}Ctrl`;
    const targetID       = `${course.name}Menu`;
    const targetSelector = `#${targetID}`;
    const parentSelector = `#${parentID}`;

    // console.log("Blah");
    // console.log(this.props);
    // const linkMeta = [];
    const linkMeta = this.getCourseDropdownLinks(course);

    return (
      <div id={controllerID} className="courseControl">
        <div className="qButton courseLabel textshadow" type="button"
             data-toggle="collapse" data-target={targetSelector}
             aria-expanded="true" aria-controls={targetID}
          >
          {course.name}
        </div>
        <div id={targetID} className="courseMenu collapse"
             aria-labelledby={controllerID} data-parent={parentSelector}
          >
          <ul>
            {linkMeta.map(
              (linkInfo) => (
                <li>
                  <Link to={linkInfo.href}>
                    <div className="qButton">
                      {linkInfo.text}
                    </div>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    )
  }

  getCourseListComponent() {
    const courses = this.getMyCourses();
    const parentID = "coursesMenu";

    const linkComponents = courses.map(
      (course) => this.constructCourseMenu(course, parentID)
    );

    console.log(linkComponents);
    return linkComponents;
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
