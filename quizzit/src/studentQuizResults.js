import React from 'react';
import Button from 'react-bootstrap/lib/Button';

import Template from './mainTemplate.js';
import ProgressBar from './progressBar.js';
import PieChart from './pieChart.js';
import Table from './statTable.js';

import './style/template.css';

import { createHorizontalDivider } from './globals.js';

export default class StudentQuizResults extends React.Component{
  constructor(props){
      super(props);

      this.state = {
        subject: this.props.match.params.course,
        series: this.props.match.params.quizNum,
        title: "Matter and the Elements",
        description: "Description of quiz goes here...",
        average: 90.521261251,
        questions: {
          Q1: {
            correct: "(b)"
          },
          Q2: {
            correct: "(c)"
          },
          Q3: {
            correct: "(a)"
          },
          Q4: {
            correct: "(d)"
          }
        },
        answers: {
          Q1: "(b)",
          Q2: "(b)",
          Q3: "(a)",
          Q4: "(d)"
        }
      };
  }

  render() {
    const answers = Object.keys(this.state.questions).map((qName) => {
      const correct = this.state.questions[qName].correct;
      const chosen  = this.state.answers[qName];
      return [{text: qName}, chosen, correct];
    });
    const average = this.state.average;

    const quizTitle = `${this.state.subject} Quiz ${this.state.series}: ${this.state.title}`;

    const wrongAnswerTargetter = (row, column, value) => {
      return row[1] !== row[2];
    }

    return(
      <Template userType={this.props.userType}>
        <div className="blockTitle ml-4 mt-3 mb-4">
          <h3 className="figure">
            {quizTitle}
          </h3>
          { createHorizontalDivider(2, "background-medium") }
          <h5 className="body font-dark">
            {this.state.description}
          </h5>
        </div>

        <div className="container pl-4">
          <ProgressBar percent={average}>
            My Grade:
          </ProgressBar>
          { createHorizontalDivider(16, "background-light")}
          <Table title={`${this.props.quizTitle} Answers`}
                 headers={[{text: "Question"}, {text: "Your Answer"}, {text: "Correct Answer"}]}
                 data={answers}
                 targetter={wrongAnswerTargetter}>
          </Table>
        </div>
      </Template>
    );
  }
}
