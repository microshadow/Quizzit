import React from 'react';
import Chart from 'chart.js';
import PopperJs from 'popper.js';

export class StudentSummaryChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        let myChart = document.getElementById("myChart").getContext("2d");
        this.barChart = new Chart(myChart, {
            type: "pie",
            data: {
                labels: ["chapter1", "chapter2", "chapter3", "chapter4", "chapter5", "chapter6", "chapter7", "chapter8", "chapter9", "chapter10"],
                datasets: [{
                    label: "Grades (out of 10)",
                    data: [0.7, 0.8, 1.0, 1.0, 0.5, 0.6, 0.9, 1.0, 0.4,0.8],
                    backgroundColor: ["red", "yellow", "blue", "green", "orange", "purple", "aqua", "blueviolet", "coral", "greenyellow"],
                    borderWidth: 2,
                    borderColor: "gray"
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Grades for each Quiz of this course",
                    fontSize: 25,
                },
                legend: {
                    position: "right",
                }
            },
        });
    }

    render(){
        return(
            <input type="text" id="quizMarks" placeholder="input marks for each quiz">

            <button id="peiChartBtn" onclick="createPieChart()">Show me my marks for all quizzes</button>

                <div className="container">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
            <p id="outputWorstMark"></p>
        );
    }
}
