import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import Legend from 'chartist-plugin-legend';

import './style/statDisplays.css';


export default class PieChart extends Component {
  render() {
    const data = this.props.answers.map((datum) => datum.value);
    const labels = this.props.answers.map((datum) => datum.label);

    const indexOfCorrect = this.props.answers.findIndex(
      (datum) => datum.label === this.props.correctAnswer
    );

    data[indexOfCorrect] = {value: data[indexOfCorrect], className: "correctAnswer"};
    const classNames = Array(this.props.answers.length).fill("");
    classNames[indexOfCorrect] = "correctAnswer";

    const chartData = {
      series: data,
      labels: labels
    };

    const options = {
      stackBars: true,
      labels: false,
      plugins: [
        Legend({
          classNames: classNames
        })
      ]
    };

    return (
      <div className="pieChart">
        <h5>
          {this.props.title}
        </h5>
        <ChartistGraph type="Pie" data={chartData} options={options}/>
      </div>
    )
  }
}
