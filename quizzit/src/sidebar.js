import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { STUDENT, EDUCATOR, ADMIN, createVerticalDivider,
         getAuthorizedUser } from './globals.js';
import './style/sidebar.css';


class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.constructCourseMenu = this.constructCourseMenu.bind(this);
    this.getCourseDropdownLinks = this.getCourseDropdownLinks.bind(this);
    this.getCourseListComponent = this.getCourseListComponent.bind(this);
  }

  getCourseDropdownLinks(course) {
    console.log("In course drop down area");
    console.log(this.props.userType)
    if (this.props.userType === STUDENT) {
      const links = [
        {
          "text": "View History",
          "href": !course.quiz && course.quiz !== 0
                  ? null
                  : `/${course.courseCode}/${course.quiz}/grades`
        }];

      if (course.quiz != null) {
        links.push({
          "text": "Take Quiz",
          "href": `/${course.quiz}/${course.courseCode}`
        });
      }

      return links;
    } else if (this.props.userType === "E") {
      console.log("Entered Educator if statement")
      let firstOp = {}
      if (course.quiz != null) {
        firstOp["text"] = "Open Quiz";
        firstOp["href"] = `${course.quiz}/${course.courseCode}/`;
      } else {
        firstOp["text"] = "Create Quiz";
        firstOp["href"] = `/createQuiz/${course.courseCode}`;
      }

      return [firstOp,
        {
          "text": "Past Quizzes",
          "href": course.quiz === null
                  ? null
                  : `/${course.courseCode}/${course.quiz}/overview`
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
          "href": `/${course.courseCode}/${course.quiz}/overview`
        },
      ];
    }
  }

  constructCourseMenu(course, parentID) {
    const controllerID   = `${course.courseCode}Ctrl`;
    const targetID       = `${course.courseCode}Menu`;
    const targetSelector = `#${targetID}`;
    const parentSelector = `#${parentID}`;

    const linkMeta = this.getCourseDropdownLinks(course);
    console.log("Printing link meta");
    console.log(linkMeta)
    console.log("Printing course shit");
    console.log(course)

    const linkComponents = linkMeta.map((linkInfo) => {
      if (linkInfo.href) {
        return (
          <li>
            <Link to={linkInfo.href}>
              <div>
                {linkInfo.text}
              </div>
            </Link>
          </li>
        )
      } else {
        return (
          <li>
            <div className="qButton">
             {linkInfo.text}
            </div>
          </li>
        );
      }
    });

    console.log("printing link components");
    console.log(linkComponents)
    return (
      <div id={controllerID} className="courseControl">
        <div className="qButton courseLabel textshadow" type="button"
             data-toggle="collapse" data-target={targetSelector}
             aria-expanded="true" aria-controls={targetID}
          >
          {course.courseCode}
        </div>
        <div id={targetID} className="courseMenu collapse"
             aria-labelledby={controllerID} data-parent={parentSelector}
          >
          <ul>
            { linkComponents }
          </ul>
        </div>
      </div>

    )
  }

  getCourseListComponent() {
    const courses = this.props.courses;
    const parentId = "coursesMenu";
    console.log("Printing courses recieved in the sidebar")
    console.log(courses)

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

    console.log("Printing base components")
    console.log(baseComponents);

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
