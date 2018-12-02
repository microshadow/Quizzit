import React from 'react';
import Chart from 'chart.js';
import PopperJs from 'popper.js';
import Button from 'react-bootstrap/lib/Button';

import Template from './mainTemplate.js';

export class StudentSummaryChart extends React.Component{
  constructor(props){
      super(props);
      this.state = {};

      this.resetChart = this.resetChart.bind(this);
      this.createChart = this.createChart.bind(this);
      this.loadChart = this.loadChart.bind(this);
  }

  createChart(course, quizNum) {
    let myChart = document.getElementById("myChart").getContext("2d");
    return new Chart(myChart, {
      type: "pie",
      data: {
        labels: ["chapter1", "chapter2", "chapter3", "chapter4", "chapter5", "chapter6", "chapter7", "chapter8", "chapter9", "chapter10"],
        datasets: [{
          label: "Grades (out of 10)",
          data: [0.7, 0.8, 1.0, 1.0, 0.5, 0.6, 0.9, 1.0, 0.4, 0.8],
          backgroundColor: ["red", "yellow", "blue", "green", "orange", "purple", "aqua", "blueviolet", "coral", "greenyellow"],
          borderWidth: 0,
        }]
      },
      options: {
        title: {
          display: true,
          text: `${course} Quiz ${quizNum} Performance`,
          fontSize: 25,
        },
        legend: {
          position: "right",
        }
      },
    });
  }

  loadChart() {
    const courseName = this.props.match.params.course;
    const quizNum = document.getElementById("quizInput").value;

    this.state.barChart = this.createChart(courseName, quizNum);
  }

  resetChart() {
    const chart = document.getElementById("myChart");

    if (chart != undefined) {
      const parent = chart.parentElement;

      const newChart = document.createElement("canvas");
      newChart.id = "myChart";

      parent.removeChild(chart);
      parent.appendChild(newChart);
    }
  }

  render(){
    this.resetChart();

    return(
      <div>
        <input id="quizInput" placeholder="Enter a Quiz Number"/>
        <Button onClick={this.loadChart}>
          Display Quiz Performance:
        </Button>
        <div className="container">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    );
  }
}

export default StudentSummaryChart;
