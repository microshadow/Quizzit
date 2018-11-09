import React from 'react';
import Chart from 'chart.js';
import './style/gradeChart.css';
import Button from 'react-bootstrap/lib/Button';

var pieChart;
var quizMarks = [];
const pieChartObject = {
    type: "pie",
    data: {
        labels: ["chapter1", "chapter2", "chapter3", "chapter4", "chapter5", "chapter6", "chapter7", "chapter8", "chapter9", "chapter10"],
        datasets: [{
            label: "Grades (out of 10)",
            data: [],
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
};

function getQuizMarks() {
    quizMarks = document.getElementById("quizMarks").value.split(",");

    if (pieChartObject.data.datasets[0].data.length == 0) {
        for (let i = 0; i < quizMarks.length; i++) {
            pieChartObject.data.datasets[0].data.push(quizMarks[i]);
            //console.log(arrayOfCorrect.length);
            //console.log(arrayOfCorrect[0]);
        }
    }
}

function getTheWorstQuiz() {
    // firstly, convert the array of string (from user input) to float number.
    const floatArray = [];
    for(let i = 0; i < quizMarks.length; i++)
    {
        floatArray.push(parseFloat(quizMarks[i]));
    }

    // compare the number in that array.
    var worst = floatArray[0];
    // console.log(numArray);
    for(let i = 0; i < floatArray.length; i++)
    {
        if(floatArray[i] < worst)
        {
            worst = floatArray[i];
        }
    }

    // then return the i, which is index, since we want to show 'where' holds the minimum number
    for(let i = 0; i < floatArray.length; i++)
    {
        if(floatArray[i] === worst)
        {
            return i+1;
        }
    }
}

function chapterNeedToReview() {
    const qString = "Try to review the content of Chapter #" + getTheWorstQuiz();
    const a = document.getElementById("outputWorstMark");
    a.appendChild(document.createTextNode(qString));
}


export class StudentSummaryChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        let myChart = document.getElementById("myChart").getContext("2d");
        this.createChart = () => {
            getQuizMarks();
            this.barChart = new Chart(myChart, pieChartObject);
            getTheWorstQuiz();
        }
    }
   
    render(){
        return(
            <div>
                <input type="text" id="quizMarks" placeholder="input marks for each quiz" />

                <Button id="pieChartBtn" onclick={()=>{this.createPieChart()}}>Show me my marks for all quizzes</Button>

                    <div className="container">
                        <canvas id="myChart"></canvas>
                    </div>
                <p id="outputWorstMark"></p>
            </div>
        );
    }
}
