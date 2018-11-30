import React, { Component } from 'react';

import Template from './mainTemplate.js';
import ProgressBar from './progressBar.js';
import PieChart from './pieChart.js';
import Table from './statTable.js';
import { createHorizontalDivider, createVerticalDivider } from './globals.js';

import './style/template.css';


export default class ClassQuizResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      description: null,
      questions: [],
      performance: [],
      subject: this.props.match.params.course,
      series: this.props.match.params.quizNum
    };

    this.getPerformance = this.getPerformance.bind(this);
    this.extractAttendanceRate = this.extractAttendanceRate.bind(this);
    this.extractAverageGrade = this.extractAverageGrade.bind(this);
    this.getPerformanceRecord = this.getPerformanceRecord.bind(this);
    this.getQuestionStats = this.getQuestionStats.bind(this);
  }

  getPerformance() {
    return {
      title: "Matter and the Elements",
      description: "Description goes here...",
      questions: {
        Q1: {
          weight: 1,
          correct: "(b)",
        },
        Q2: {
          weight: 1,
          correct: "(a)"
        },
        Q3: {
          weight: 1,
          correct: "(a)",
        },
        Q4: {
          weight: 1,
          correct: "(d)"
        }
      },
      performance: [
        {
          studentId: 39000,
          first: "Daniel",
          last: "Hubbs",
          answers: {
            Q1: "(b)",
            Q2: "(c)",
            Q3: "(a)",
            Q4: "(d)"
          }
        },
        {
          studentId: 0,
          first: "Jane",
          last: "Yue",
          answers: null
        }
      ]
    };
  }

  extractAttendanceRate() {
    const reducer = (accumulator, student) => {
      return student.answers === null ? accumulator : accumulator + 1;
    };

    const numInAttendance = this.state.performance.reduce(reducer, 0);
    const enrolment = this.state.performance.length;

    const attendanceRate  = 100 * numInAttendance / enrolment;
    return attendanceRate;
  }

  extractAverageGrade() {
    const scoreFromAnswers = (answers) =>  {
      let totalScore = 0;
      for (let questionName in this.state.questions) {
        if (questionName in answers) {
          const choice = answers[questionName];
          const question = this.state.questions[questionName];

          if (choice === question.correct) {
            totalScore += question.weight;
          }
        }
      }

      return totalScore;
    }

    const totalQuestionWeight =
      Object.values(this.state.questions).reduce(
        (acc, question) => acc + question.weight, 0
      );

    const reducer = (accumulator, student) => {
      return student.answers === null
             ? accumulator
             : [accumulator[0] + scoreFromAnswers(student.answers),
                accumulator[1] + totalQuestionWeight];
    };

    const gradeData = this.state.performance.reduce(reducer, [0, 0]);
    return 100 * gradeData[0] / gradeData[1];
  }

  getPerformanceRecord() {
    const courseCode = this.props.match.params.course;
    const questionNames = Object.keys(this.state.questions);
    const attendanceHeaders = [{text: "Name"}].concat(questionNames.map((text) => {
      return {text}
    }));
    const attendanceRows    = this.state.performance.map((studentData) => {
      const name = studentData.first + " " + studentData.last;
      const href = `/summary/${studentData.studentId}/${courseCode}`;
      const lead = [{
        text: name,
        href: href
      }];

      const reports = questionNames.map((qName) => {
        if (studentData.answers === null) {
          return "A";
        } else if (qName in studentData.answers) {
          return studentData.answers[qName];
        } else {
          return "X";
        }
      })
      return lead.concat(reports);
    });

    const wrongAnswerTargetter = (row, column, val) => {
      if (column in this.state.questions) {
        const question = this.state.questions[column];
        return val !== question.correct;
      } else {
        return true;
      }
    }

    return (
      <Table title={`${this.state.title} Performance`}
             headers={attendanceHeaders}
             data={attendanceRows}
             targetter={wrongAnswerTargetter}>
      </Table>
    );
  }

  getQuestionStats() {
    const questionsMap = {};
    for (let qName in this.state.questions) {
      questionsMap[qName] = {};
    }

    const reducer = (acc, studentAnswers) => {
      if (studentAnswers !== null) {
        for (let qName in studentAnswers.answers) {
          const choice = studentAnswers.answers[qName];
          if (!(choice in acc[qName])) {
            acc[qName][choice] = 0;
          }

          acc[qName][choice] += 1;
        }
      }

      return acc;
    }

    return this.state.performance.reduce(reducer, questionsMap);
  }

  generateQuestionStatsChart(questionStats) {
    return Object.keys(questionStats).map((qName) => {
      const title = `${qName} Answer Distribution`;
      const correct = this.state.questions[qName].correct;

      const qStats = questionStats[qName];
      const answerDistr = Object.keys(qStats).map((answer) => {
        return {
          label: answer,
          value: qStats[answer]
        };
      });

      return (
        <PieChart title={title}
                  answers={answerDistr}
                  correctAnswer={correct}>
        </PieChart>
      );
    });
  }

  componentDidMount() {
    const loadedState = this.getPerformance();
    loadedState.subject = this.props.match.params.course;
    loadedState.series  = this.props.match.params.quizNum;

    this.setState(loadedState);
  }

  render() {
    const subject = this.props.match.params.course;
    const quizNum = this.props.match.params.quizNum;
    const quizTitle = `${subject} Quiz ${quizNum}`;

    const attendanceRate = this.extractAttendanceRate();
    const attendanceRecord = this.getPerformanceRecord();
    const averageGrade  = this.extractAverageGrade();

    const questionStats = this.getQuestionStats();
    console.log(questionStats);
    const questionStatCharts = this.generateQuestionStatsChart(questionStats);

    return (
      <Template userType={this.props.userType}>
        <div className="blockTitle ml-4 mt-3 mb-4">
          <h3 className="figure mb-1">
            {quizTitle}
          </h3>
          <h5 className="subhead font-dark">
            {this.state.title}
          </h5>
          { createHorizontalDivider(2, "background-medium") }
          <h5 className="body font-dark">
            {this.state.description}
          </h5>
        </div>
        <div id="classQuizGrades" className="ml-4">
          <ProgressBar percent={averageGrade}>
            Class Average
          </ProgressBar>
          { createHorizontalDivider(8, "background-light") }
          <ProgressBar percent={attendanceRate}>
            Percent Attendance
          </ProgressBar>
          { createHorizontalDivider(16, "background-light") }
          { attendanceRecord }
          { createHorizontalDivider(40, "background-light") }
          <div className="d-flex flex-wrap">
            { questionStatCharts }
          </div>
        </div>
      </Template>
    )
  }
}
