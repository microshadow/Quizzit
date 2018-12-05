import React, { Component } from 'react';

import Template from './mainTemplate.js';
import ProgressBar from './progressBar.js';
import { Table } from './statTable.js';
import { createHorizontalDivider, toPercent } from './globals.js';


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

    this.createAverageBar = this.createAverageBar.bind(this);
    this.createPerformanceGraph = this.createPerformanceGraph.bind(this);
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
        basis.href = `/${this.props.course}/${quiz.series}/grades`;
      }

      return basis;
    });

    return (
      <Table title={`${this.props.course} Performance Record`}
             columnHeads={[""].concat(headers)}
             data={[["Grade"].concat(data)]}
             highlight={(row, column, ind) => row[ind].text === "A"}
             heads={[]}
             tails={[{colHead: "Average", generate: (ind, row) => toPercent(this.state.performance.average, 2)},
                     {colHead: "Attendance", generate: (ind, row) => toPercent(row.filter((cell) => cell.text !== "A").length * 100.0 / row.length)}]}>
      </Table>
    );
  }

  componentDidMount() {
    const loadState = {
      student: {
        id: this.props.studentId,
        first: "Daniel",
        last: "Hubbs"
      },
      performance: {
        average: 60.25126126,
        history: [
          {
            series: 1,
            title: "Units and Scientific Notation",
            grade: 92.2125152
          },
          {
            series: 2,
            title: "Stars and Planets",
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
      }
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
          { createHorizontalDivider(14, "background-light")}
          { this.createPerformanceGraph() }
        </div>
      </div>
    );
  }
}
