import React, { Component } from 'react';
import axios from 'axios';

import Template from './mainTemplate.js';
import StudentCourseSummary from './studentCourseSummary.js';
import Table from './statTable.js';
import { createHorizontalDivider } from './globals.js';

import './style/template.css';


export default class StudentSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: {
        studentId: null,
        first: null,
        last: null,
      },
      courses: []
    };

    this.getStudentCourses = this.getStudentCourses.bind(this);
    this.getCourseSummaries = this.getCourseSummaries.bind(this);
  }

  getStudentCourses() {
    axios.get(`/api/courses/${this.props.match.params.studentId}`)
         .then((response) => {
      const newState = response.data;
      this.setState(newState);
    })
  }

  getCourseSummaries(studentId) {
    return this.state.courses.map((course) => {
      return (
        <StudentCourseSummary studentId={this.state.studentId}
                              course={course}>
        </StudentCourseSummary>
      )
    })
  }

  componentDidMount() {
    this.getStudentCourses();
  }

  render() {
    const fullName = this.state.student.first + " " + this.state.last;
    return (
      <div className="studentWholeSummary">
        <div className="blockTitle ml-4 mb-3 mt-3">
          <h3 className="figure mb-1">
            {fullName}
          </h3>
          <h5 className="subhead font-dark">
            Student ID: {this.state.studentId}
          </h5>
        </div>
        { this.getCourseSummaries() }
      </div>
    )
  }
}
