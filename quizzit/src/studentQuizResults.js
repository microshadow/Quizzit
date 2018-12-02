import React from 'react';
import Button from 'react-bootstrap/lib/Button';

import Template from './mainTemplate.js';
import ProgressBar from './progressBar.js';
import PieChart from './pieChart.js';
import { Table } from './statTable.js';
import { createHorizontalDivider, toPercent, nRange } from './globals.js';

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
        subject: null,
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
    return {
      student: {
        studentId: 39000,
        first: "Daniel",
        last: "Hubbs"
      },
      quiz: {
        id: 1,
        subject: this.props.match.params.course,
        series: this.props.match.params.quizNum,
        title: "Matter and the Elements",
        description: "Description goes here...",
        questions: [
          {
            id: 1,
            display: "Q1",
            text: "Which of the following is an example of a chemical change?",
            weight: 1,
            correct: [1],
            options: [
              {
                id: 1,
                display: "(a)",
                text: "Oil and water separate into layers after mixing."
              },
              {
                id: 2,
                display: "(b)",
                text: "A white powder emerges when two liquids are mixed."
              },
              {
                id: 3,
                display: "(c)",
                text: "Salt dissolves in water when stirred."
              },
              {
                id: 4,
                display: "(d)",
                text: "An electric current heats up metal in a lightbulb."
              }
            ]
          },
          {
            id: 2,
            display: "Q2",
            text: "Which of the following substances are pure substances?",
            weight: 1,
            correct: [1, 3],
            options: [
              {
                id: 5,
                display: "(a)",
                text: "Air."
              },
              {
                id: 6,
                display: "(b)",
                text: "Water."
              },
              {
                id: 7,
                display: "(c)",
                text: "Granite."
              },
              {
                id: 8,
                display: "(d)",
                text: "Helium gas."
              }
            ]
          },
          {
            id: 3,
            display: "Q3",
            text: "Francium, element 87, is located in the leftmost column"
                  + " in the periodic table. Which of the following properties"
                  + " is francium unlikely to have?",
            weight: 1,
            correct: [3],
            options: [
              {
                id: 9,
                display: "(a)",
                text: "Solid at room temperature."
              },
              {
                id: 10,
                display: "(b)",
                text: "Metallic but soft."
              },
              {
                id: 11,
                display: "(c)",
                text: "Reacts explosively with water."
              },
              {
                id: 12,
                display: "(d)",
                text: "Forms mostly covalent compounds."
              }
            ]
          },
          {
            id: 4,
            display: "Q4",
            text: "Which of the following experiments was performed by Ernest Rutherford?",
            weight: 1,
            correct: [2],
            options: [
              {
                id: 13,
                display: "(a)",
                text: "Electrolyzed common materials until they stopped changing."
              },
              {
                id: 14,
                display: "(b)",
                text: "Observed particles passing through a cathode ray tube."
              },
              {
                id: 15,
                display: "(c)",
                text: "Shot alpha particles through a sheet of gold foil."
              },
              {
                id: 16,
                display: "(d)",
                text: "Observed and explained visible spectra of hydrogen gas."
              }
            ]
          }
        ]
      },
      performance: {
        grade: 75,
        classAverage: 75,
        answers: [
          {
            id: 1,
            choice: 1,
            classAverage: 100
          },
          {
            id: 2,
            choice: 2,
            classAverage: 0
          },
          {
            id: 3,
            choice: 3,
            classAverage: 100
          },
          {
            id: 4,
            choice: 2,
            classAverage: 100
          }
        ]
      }
    };
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

      return [question.options[answer].display];
    });

    // An extra row is added to the bottom for class average, with no entry for
    // primary data.
    if (answers.length > 0) {
      answers.push([""]);
    }

    const quizTitle = `${this.state.quiz.subject} Quiz ${this.state.quiz.series}: ${this.state.quiz.title}`;

    // Highlighter picks out cells that are (a) in the primary column and (b)
    // represent places where the student got the wrong answer (or no answer).
    const highlightWrongAnswer = (row, col, ind) => {
      if (ind !== 1 || row[ind].text === "") {
        return false;
      } else {
        console.log(row, col, ind);
        const qIndex   = this.state.quiz.questions.findIndex((question) => question.display === row[0].text);
        const question = this.state.quiz.questions[qIndex];
        const answer   = this.state.performance.answers[qIndex];


        return !question.correct.includes(answer.choice);
      }
    };

    return(
      <Template userType={this.props.userType}>
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
                     const correctAnswers = question.correct.map(
                       (qInd) => question.options[qInd].display
                     );

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
                     return question.correct.includes(answer.choice)
                            ? question.weight
                            : 0;
                   }
                 }},
                 {colHead: "Class Performance", generate: (ind, row) => {
                   if (ind < this.state.performance.answers.length
                       && this.state.performance.answers[ind]) {
                     // Valid, interior table cells report the class average
                     // for the question that the row represents.
                     return toPercent(this.state.performance.answers[ind].classAverage, 0);
                   } else {
                     // Final table row reports the class average for the quiz.
                     return toPercent(this.state.performance.classAverage, 2);
                   }
                 }}]}>
          </Table>
        </div>
      </Template>
    );
  }
}
