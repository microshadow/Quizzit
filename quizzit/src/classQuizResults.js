import React, { Component } from 'react';
import axios from 'axios';

import Template from './mainTemplate.js';
import ProgressBar from './progressBar.js';
import PieChart from './pieChart.js';
import { Table, highlightWrongAnswer } from './statTable.js';
import { createHorizontalDivider, createVerticalDivider,
         toPercent, nRange } from './globals.js';

import './style/template.css';


export default class ClassQuizResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: {
        id: 0,
        subject: this.props.match.params.course,
        series: this.props.match.params.quizNum,
        title: null,
        description: null,
        questions: [],
      },
      stats: {
        average: 0,
        attendance: 0,
        performance: []
      }
    };

    this.getPerformance = this.getPerformance.bind(this);
    this.extractAttendanceRate = this.extractAttendanceRate.bind(this);
    this.extractAverageGrade = this.extractAverageGrade.bind(this);
    this.getPerformanceRecord = this.getPerformanceRecord.bind(this);
    this.getQuestionStats = this.getQuestionStats.bind(this);
  }

  getPerformance() {
    axios.get(`/api/performance/quiz/${this.props.quizId}/`).then((response) => {
      const newState = response.data;
      this.setState(newState);
    });
  }

  extractAttendanceRate() {
    return this.state.stats.attendance;
  }

  extractAverageGrade() {
    return this.state.stats.average;
  }

  getPerformanceRecord() {
    const courseCode = this.props.match.params.course;
    const questionNames = this.state.quiz.questions.map((question) => question.display);
    const questionIndices = nRange(this.state.quiz.questions.length);

    const attendanceHeaders = questionNames.map((text) => {
      return {
        text: text,
        expand: ["(a)", "(b)", "(c)", "(d)"].join("\n")
      };
    });

    // Build text for each table cell: A if the student was absent, X if they
    // missed the question, otherwise the answer they chose.
    const attendanceRows = this.state.stats.performance.map((studentData) => {
      const reports = questionIndices.map((qIndex) => {
        if (studentData.answers === null) {
          return "A";
        } else if ("choice" in studentData.answers[qIndex]) {
          const choiceIndex = studentData.answers[qIndex].choice;
          const question    = this.state.quiz.questions[qIndex];
          return question.options[choiceIndex].display;
        } else {
          return "X";
        }
      })

      return reports;
    });

    // Metadata objects for name cells at the left side of the table.
    const studentNames = this.state.stats.performance.map((studentData) => {
      const name = studentData.student.first + " " + studentData.student.last;
      const href = `/summary/${studentData.student.id}/${courseCode}`;

      return {
        text: name,
        href: href
      };
    });

    const averageGenerator = (ind, row) =>
      toPercent(this.state.stats.performance[ind].grade, 2);

    return (
      <Table title={`Quiz ${this.state.quiz.series} Performance`}
             columnHeads={attendanceHeaders}
             data={attendanceRows}
             highlight={highlightWrongAnswer.bind(this)}
             heads={[{colHead: "Name", rows: studentNames}]}
             tails={[{colHead: "Grade", generate: averageGenerator.bind(this)}]}>
      </Table>
    );
  }

  getQuestionStats() {
    const questionsMap = [];
    const numQuestions = this.state.quiz.questions.length;
    // Build a map of question index to another map, which translates answer
    // index of the parent question to the number of students who chose that
    // answer. Initially zero for all.
    for (let qIndex = 0; qIndex < numQuestions; qIndex++) {
      const question = this.state.quiz.questions[qIndex];
      questionsMap.push(Array(question.options.length).fill(0));
    }

    // Repeatedly add 1 to each answer each student chooses.
    const reducer = (acc, student) => {
      if (student.answers !== null) {
        for (let qIndex = 0; qIndex < numQuestions; qIndex++) {
          // Loop through all answers the student gave to any question.
          const question = this.state.quiz.questions[qIndex];
          const answer   = student.answers[qIndex].choice;

          if (answer) {
            // The student provided this answer to this question.
            console.log(answer);
            acc[qIndex][answer] += 1
          }
        }
      }

      return acc;
    }

    return this.state.stats.performance.reduce(reducer, questionsMap);
  }

  generateQuestionStatsChart(questionStats) {
    const qIndices = nRange(questionStats.length);
    return qIndices.map((qIndex) => {
      // Generate one pie chart per question.
      const question = this.state.quiz.questions[qIndex];
      const title = `${question.display} Answer Distribution`;
      const correct = question.correct;

      const qStats = questionStats[qIndex];
      const usedAnswers = nRange(qStats.length).filter((aIndex) => qStats[aIndex] > 0);

      if (usedAnswers.length === 0) {
        // No students answered this question at all. Omit any pie charts for it.
        return null;
      } else {
        // Translate the map of answer index to number of students that chose
        // that answer into an object of the right form for a pie chart to read.
        const answerDistr = usedAnswers.map((aIndex) => {
          return {
            label: question.options[aIndex].display,
            value: qStats[aIndex]
          };
        });

        return (
          <PieChart title={title}
                    answers={answerDistr}
                    correctAnswer={correct}>
          </PieChart>
        );
      }
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
    const performanceRecord = this.getPerformanceRecord();
    const averageGrade  = this.extractAverageGrade();

    const questionStats = this.getQuestionStats();
    const questionStatCharts = this.generateQuestionStatsChart(questionStats);

    return (
      <div className="classResults">
        <div className="blockTitle ml-4 mt-3 mb-4">
          <h3 className="figure mb-1">
            {quizTitle}
          </h3>
          <h5 className="subhead font-dark">
            {this.state.quiz.title}
          </h5>
          { createHorizontalDivider(2, "background-medium") }
          <h5 className="body font-dark">
            {this.state.quiz.description}
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
          { performanceRecord }
          { createHorizontalDivider(20, "background-light") }
          <div className="d-flex flex-wrap">
            { questionStatCharts }
          </div>
        </div>
      </div>
    )
  }
}
