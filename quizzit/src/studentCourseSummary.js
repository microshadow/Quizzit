import React, { Component } from 'react';
import axios from 'axios';

import Template from './mainTemplate.js';
import ProgressBar from './progressBar.js';
import { Table } from './statTable.js';
import { createHorizontalDivider, toPercent,
         getAuthorizedUser } from './globals.js';


export default class StudentCourseSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: {
        id: null,
        first: null,
        last: null
      },
      performance: {
        average: 0,
        history: []
      }
    };

    this.getCourseGrades = this.getCourseGrades.bind(this);
    this.createAverageBar = this.createAverageBar.bind(this);
    this.createPerformanceGraph = this.createPerformanceGraph.bind(this);
  }

  getCourseGrades() {
    const user = getAuthorizedUser();
    const userId = user._id;
    axios.get(`/api/performance/subject/${userId}/${this.props.course._id}`)
         .then((response) => {
      const newState = response.data;
      this.setState(newState);
    })
  }

  createAverageBar() {
    return (
      <ProgressBar percent={this.state.performance.average}>
        Current Average
      </ProgressBar>
    )
  }

  createPerformanceGraph() {
    // Define table cell values: either "A" if the student missed the quiz,
    // or their grade otherwise.
    const data = this.state.performance.history.map((quiz) =>
      quiz.grade ? toPercent(quiz.grade, 2) : "A"
    );

    // Define values for the row of headers at the top of the table.
    // Quizzes the student did not skip contain links to their results page.
    const headers = this.state.performance.history.map((quiz) => {
      const basis = {
        text: `Quiz ${quiz.series}`,
        expanded: quiz.title
      };

      if (quiz.grade) {
        basis.href = `/${quiz._id}/grades`;
      }

      return basis;
    });

    return (
      <Table title={`${this.props.course.courseCode} Performance Record`}
             columnHeads={headers}
             data={[data]}
             highlight={(row, column, ind) => row[ind].text === "A"}
             heads={[{colHead: "", rows: ["Grade"]}]}
             tails={[{colHead: "Average", generate: (ind, row) => toPercent(this.state.performance.average, 2)},
                     {colHead: "Attendance", generate: (ind, row) => toPercent(row.filter((cell) => cell.text !== "A").length * 100.0 / row.length)}]}>
      </Table>
    );
  }

  componentDidMount() {
    this.getCourseGrades();
  }

  render() {
    return (
      <div className="courseSummary mb-5">
        <div className="blockTitle ml-4 mb-3">
          { createHorizontalDivider(2, "background-medium") }
          <h4 className="font-dark ml-2">
            {this.props.course.courseCode}
          </h4>
          { createHorizontalDivider(2, "background-medium") }
        </div>
        <div className="ml-4">
          { this.createAverageBar() }
          { createHorizontalDivider(14, "background-light")}
          { this.createPerformanceGraph() }
        </div>
      </div>
    );
  }
}
