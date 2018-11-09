import React from 'react';
import Chart from 'chart.js';
import './style/gradeChart.css';

import Template from './mainTemplate.js';
import ProgressBar from './progressBar.js';
import { createVerticalDivider } from './globals.js';

const chartObject = []; // array of chart(myChart, object); 2nd parameter for class Chart.
var arrayOfCorrect = []; //array of user input


function getInputValue() {
    arrayOfCorrect = document.getElementById("numberOfCorrect").value.split(",");

    if (chartObject[0].data.datasets[0].data.length == 0) {
        for (let i = 0; i < arrayOfCorrect.length; i++) {
            chartObject[0].data.datasets[0].data.push(arrayOfCorrect[i]);
            }
    }
}

function getTheMin() {
    // firstly, convert the array of string (from user input) to number.
    const numArray = [];
    for(let i = 0; i < arrayOfCorrect.length; i++)
    {
        numArray.push(parseInt(arrayOfCorrect[i]));
    }

    // compare the number in that array.
    // Note: made a mistake to compare string... (e.g. ["12","10","8","5"] instead of [12,10,8,5])
    var min = numArray[0];
    for(let i = 0; i < numArray.length; i++)
    {
        if(numArray[i] < min)
        {
            min = numArray[i];
        }
    }

    // then return the i, which is index, since we want to show 'where' holds the minimum number
    for(let i = 0; i < numArray.length; i++)
    {
        if(numArray[i] === min)
        {
            return i+1;
        }
    }
}

// DOM function to append text to HTML page.
function whichQuestionIsHard() {
    const qString = "The hardest question of this quiz is #" + getTheMin();
    const a = document.getElementById("outputMessage");
    a.appendChild(document.createTextNode(qString));
}


export class GradeChart extends React.Component{
    constructor(props){
        super(props);

        this.getQuizData = this.getQuizData.bind(this);
        this.getChart = this.getChart.bind(this);
        this.createGraph = this.createGraph.bind(this);
        this.createPerformanceGraphs = this.createPerformanceGraphs.bind(this);
        this.resetPerformance = this.resetPerformance.bind(this);

        this.state = {
          quizData: {
            name: "",
            average: 100,
            attendance: 0,
            enrolment: 0
          },
          performanceGraphs: []
        };
    }

    getQuizData(quizNum) {
      return {
        name: "Matter and the Elements",
        average: 97.59,
        attendance: 27,
        enrolment: 36,
        questions: [
          {
            name: "Question 1",
            text: "Question Text Here",
            topics: [],
            answers: [
              {
                key: "a",
                text: "Answer (a)",
                chosenBy: 18
              },
              {
                key: "c",
                text: "Answer (b)",
                chosenBy: 5
              },
              {
                key: "d",
                text: "Answer (c)",
                chosenBy: 3
              },
              {
                key: "b",
                text: "Answer (b)",
                chosenBy: 1
              }
            ],
            correct: ["a"]
          },
          {
            name: "Question 2",
            text: "Question Text Here",
            topics: [],
            answers: [
              {
                key: "c",
                text: "Answer (c)",
                chosenBy: 26
              },
              {
                key: "b",
                text: "Answer (b)",
                chosenBy: 1
              }
            ],
            correct: ["c"]
          },
        ]
      }
    }

    getChart(quizName, chartContainer, question) {
      const answerKeys = question.answers.map((answer) => answer.key);
      const data = question.answers.map((answer) => answer.chosenBy);
      const colorOptions = ["red", "yellow", "blue", "green", "orange",
                            "purple", "aqua", "blueviolet", "coral",
                            "greenyellow"];

      return new Chart(chartContainer, {
          type: "pie",
          data: {
              labels: answerKeys,
              datasets: [{
                  label: "class result",
                  data: data,
                  backgroundColor: colorOptions.splice(0, question.answers.length)
              }]
          },
          options: {
              title: {
                  display: true,
                  text: `${question.name} Performance`,
                  fontSize: 25,
              },
              legend: {
                  position: "right",
              }
          },
      });
    }

  createGraph(question, title) {
    const container = document.getElementById("performanceStats");
    const chartHolder = document.createElement("canvas");
    chartHolder.classList.add("performanceGraph");
    container.appendChild(chartHolder);

    this.state.performanceGraphs.push(this.getChart(title, chartHolder, question));
  }

  createPerformanceGraphs(title) {
    this.state.quizData.questions.map((question) => this.createGraph(question, title));
  }

  resetPerformance() {
    const container = document.getElementById("performanceList");
    while (container.children.length > 0) {
      const child = container.children[0];
      container.removeChild(child);
    }

    this.state.performanceGraphs = [];
  }

  componentDidMount() {
    const quizNum = this.props.match.params.quizNum;
    const courseName = this.props.match.params.course;
    const quizTitle = `Quiz ${quizNum}: ${courseName}`;

    this.state.quizData = this.getQuizData(quizTitle);
    this.createPerformanceGraphs(quizTitle);
  }

  render() {
    return (
      <Template userType={this.props.userType}>
        <div id="classStatsHeader">
          <h1>
            Quiz {this.props.match.params.quizNum}: {this.state.quizData.name}
          </h1>
          <h3>
            Performance
          </h3>
          <div id="classInfo" className="d-flex">
            <ProgressBar percent={this.state.quizData.average}>
              Class Average
            </ProgressBar>
            { createVerticalDivider(24, "background-light") }
            <ProgressBar percent={this.state.quizData.attendance / this.state.quizData.enrolment * 100}>
              Attendance
            </ProgressBar>
          </div>
          <div id="performanceStats" className="container">
          </div>
        </div>
      </Template>
    );
  }
}
