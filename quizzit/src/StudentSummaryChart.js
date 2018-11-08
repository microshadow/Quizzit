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
            <div>
                <div class="dropdown">
                    <a class="btn btn-secondary dropdown-toggle" 
                    href="#" 
                    role="button" 
                    id="dropdownMenuLink" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false">
                        Choose your Course
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>

                <div class="container">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        );
    }
}