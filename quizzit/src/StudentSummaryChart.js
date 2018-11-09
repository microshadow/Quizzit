import React from 'react';
import Chart from 'chart.js';
import PopperJs from 'popper.js';

import Template from './mainTemplate.js';

export class StudentSummaryChart extends React.Component{
  constructor(props){
      super(props);
      this.state = {};
  }

  getChart(course, quizNum) {
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

  componentDidMount(){
    console.log("Mounting");
    const courseName = this.props.match.params.course;
    const quizNum = this.props.match.params.quiz;

    this.state.barChart = this.getChart(courseName, quizNum);
  }

  render(){
    console.log("Rendering");
    if ("barChart" in this.state) {
      console.log(this.state.barChart);
      const courseName = this.props.match.params.course;
      const quizNum = this.props.match.params.quiz;

      this.state.barChart = this.getChart(courseName, quizNum);
    }

    return(
      <Template userType={this.props.userType}>
        <div className="container">
          <canvas id="myChart"></canvas>
        </div>
      </Template>
    );
  }
}

export default StudentSummaryChart;
