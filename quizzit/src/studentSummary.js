import React, { Component } from 'react';

import Template from './mainTemplate.js';
import StudentCourseSummary from './studentCourseSummary.js';
import Table from './statTable.js';
import { createHorizontalDivider } from './globals.js';

import './style/template.css';


export default class StudentSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: null,
      first: null,
      last: null,
      courses: []
    };

    this.getCourseSummaries = this.getCourseSummaries.bind(this);
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
    const loadState = {
      studentId: this.props.match.params.studentId,
      first: "Daniel",
      last: "Hubbs",
      courses: [
        "ICS2P1",
        "MPM1D3",
        "SNC1D3"
      ]
    };

    this.setState(loadState);
  }

  render() {
    const fullName = this.state.first + " " + this.state.last;
    return (
      <Template userType={this.props.userType}>
        <div className="blockTitle ml-4 mb-3 mt-3">
          <h3 className="figure mb-1">
            {fullName}
          </h3>
          <h5 className="subhead font-dark">
            Student ID: {this.state.studentId}
          </h5>
        </div>
        { this.getCourseSummaries() }
      </Template>
    )
  }
}
