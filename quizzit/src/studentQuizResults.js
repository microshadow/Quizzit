import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';

import Template from './mainTemplate.js';
import ProgressBar from './progressBar.js';
import PieChart from './pieChart.js';
import { Table } from './statTable.js';
import { createHorizontalDivider, toPercent,
         nRange, getAuthorizedUser } from './globals.js';

import './style/template.css';

export default class StudentQuizResults extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      student: {
        id: null,
        first: null,
        last: null
      },
      quiz: {
        id: 0,
        course: {
          courseCode: null
        },
        series: null,
        title: null,
        description: null,
        questions: [],
      },
      performance: {
        grade: 0,
        average: 0,
        answers: []
      }
    };

    this.getQuizResults = this.getQuizResults.bind(this);
  }

  getQuizResults() {
    const user = getAuthorizedUser();
    const userId = user._id;

    axios.get(`/api/performance/quiz/${userId}/${this.props.match.params.quizId}`)
         .then((response) => {
      const newState = response.data;
      this.setState(newState);
    });
  }

  componentDidMount() {
    const loadState = this.getQuizResults();
    this.setState(loadState);
  }

  render() {
    // Build rows of table cells for primary data. Only one column is primary
    // data, and it contains chosen answers: other columns are heads and tails.
    const questionIndices = nRange(this.state.performance.answers.length);
    const answers = questionIndices.map((qIndex) => {
      const question = this.state.quiz.questions[qIndex];
      const answer = this.state.performance.answers[qIndex].choice;
      const match = question.options.find((option) => option._id.toString() === answer._id.toString())

      // return [[question.options[answer].display];]
      return match ? [match.display] : [null];
    });

    // An extra row is added to the bottom for class average, with no entry for
    // primary data.
    if (answers.length > 0) {
      answers.push([""]);
    }

    const quizTitle = `${this.state.quiz.course.courseCode} Quiz ${this.state.quiz.series}: ${this.state.quiz.title}`;

    // Highlighter picks out cells that are (a) in the primary column and (b)
    // represent places where the student got the wrong answer (or no answer).
    const highlightWrongAnswer = (row, col, ind) => {
      if (ind !== 1 || row[ind].text === "") {
        return false;
      } else {
        const questionTitle = row[0].text;
        const qIndex   = this.state.quiz.questions.findIndex((question) => question.display === questionTitle);
        const question = this.state.quiz.questions[qIndex];
        const answer   = this.state.performance.answers[qIndex].choice._id;

        return !question.correct.find((q) => q.toString() === answer.toString());
      }
    };

    return(
      <div className="studentQuizResults">
        <div className="blockTitle ml-4 mt-3 mb-4">
          <h3 className="figure">
            {quizTitle}
          </h3>
          { createHorizontalDivider(2, "background-medium") }
          <h5 className="body font-dark">
            {this.state.quiz.description}
          </h5>
        </div>

        <div className="container pl-4">
          <Table title={`Quiz ${this.state.quiz.series} Results`}
                 columnHeads={["Your Answer"]}
                 data={answers}
                 highlight={highlightWrongAnswer}
                 heads={[{colHead: "Question", rows: this.state.quiz.questions.map((question) => question.display)}]}
                 tails={[{colHead: "Correct Answer", generate: (ind, row) => {
                   if (ind === this.state.quiz.questions.length) {
                     // Last row in the table has no content in this column.
                     return ""
                   } else {
                     // Other rows report all correct answers for the question
                     // that the row represents.
                     const question = this.state.quiz.questions[ind];
                     const correctAnswers = question.correct.map((qCorrect) => {
                       const match = question.options.find((option) => option._id.toString() === qCorrect.toString());
                       return match ? match.display : null
                     });

                     return correctAnswers.join(", ");
                   }
                 }},
                 {colHead: "Grades", generate: (ind, row) => {
                   if (ind === this.state.quiz.questions.length) {
                     // Last row in the table reports the user's grade.
                     return this.state.performance.grade;
                   } else {
                     // Other rows report the user's score for a single question.
                     const question = this.state.quiz.questions[ind];
                     const answer   = this.state.performance.answers[ind];

                     // No part marks. 0 points for wrong answer, else a number
                     // defined by the question's weight.
                     return question.correct.includes(answer.choice._id)
                            ? question.weight
                            : 0;
                   }
                 }},
                 {colHead: "Class Performance", generate: (ind, row) => {
                   if (ind < this.state.performance.answers.length
                       && this.state.performance.answers[ind]) {
                     // Valid, interior table cells report the class average
                     // for the question that the row represents.
                     return toPercent(this.state.performance.answers[ind].question.classAverage, 0);
                   } else {
                     // Final table row reports the class average for the quiz.
                     return toPercent(this.state.performance.classAverage, 2);
                   }
                 }}]}>
          </Table>
        </div>
      </div>
    );
  }
}
