import React, { Component } from 'react';

import Template from './mainTemplate.js';
import ProgressBar from './progressBar.js';
import Table from './statTable.js';
import { createHorizontalDivider } from './globals.js';


export default class StudentCourseSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      first: null,
      last: null,
      quizzes: []
    };

    this.createAverageBar = this.createAverageBar.bind(this);
    this.createAttendanceGraph = this.createAttendanceGraph.bind(this);
  }

  createAverageBar() {
    const reducer = (acc, quiz) => quiz.grade ? acc + quiz.grade : acc;
    const gradesSum = this.state.quizzes.reduce(reducer, 0);
    const gradesPercent = gradesSum / this.state.quizzes.length;

    return (
      <ProgressBar percent={gradesPercent}>
        Current Average
      </ProgressBar>
    )
  }

  createAttendanceGraph() {
    const data = this.state.quizzes.map((quiz) =>
      quiz.grade ? "P" : "A"
    );
    const headers = this.state.quizzes.map((quiz) => {
      const quizHead = {
        text: `Quiz ${quiz.series}`,
      };

      if (quiz.grade) {
        quizHead.href = `/${this.props.course}/${quiz.series}/grades`;
      }

      return quizHead;
    });

    return (
      <Table title="Attendance Record"
             headers={[{text: null}].concat(headers) }
             data={ [[{text: "Grade"}].concat(data)] }
             targetter={(row, column, value) => value === "A"}>
      </Table>

      // I want to display attendance, overall average,
    );
  }

  componentDidMount() {
    const loadState = {
      id: this.props.studentId,
      first: "Daniel",
      last: "Hubbs",
      quizzes: [
        {
          series: 1,
          title: "Units and Scientific Notation",
          grade: 92.2125152
        },
        {
          series: 2,
          title: "The Solar System",
          grade: null
        },
        {
          series: 3,
          title: "Astronomy Unit Test",
          grade: 96.2951251
        },
        {
          series: 4,
          title: "Matter and the Elements",
          grade: 75.0000000
        }
      ]
    };

    this.setState(loadState);
  }

  render() {
    return (
      <div className="courseSummary mb-5">
        <div className="blockTitle ml-4 mb-3">
          { createHorizontalDivider(2, "background-medium") }
          <h4 className="font-dark ml-2">
            {this.props.course}
          </h4>
          { createHorizontalDivider(2, "background-medium") }
        </div>
        <div className="ml-4">
          { this.createAverageBar() }
          { createHorizontalDivider(16, "background-light") }
          { this.createAttendanceGraph() }
        </div>
      </div>
    );
  }
}
