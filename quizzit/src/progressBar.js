import React, { Component } from 'react';
import './style/statDisplays.css'

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.percentToColor = this.percentToColor.bind(this);
  }

  percentToColor(percent) {
    const baseZero    = [255, 0, 0];
    const baseFifty   = [223, 223, 50];
    const baseHundred = [52, 220, 106];
    const averageColor = []

    const low  = percent < 50 ? baseZero : baseFifty;
    const high = percent < 50 ? baseFifty : baseHundred;

    const percentDec = percent === 100 ? 1.0 : (percent % 50.0) / 50.0;
    for (let i = 0; i < 3; i++) {
      let avg = high[i] * percentDec + low[i] * (1.0 - percentDec);
      averageColor.push(avg);
    }

    return averageColor;
  }

  render() {
    const percentFull = this.props.percent;
    console.log(this.props.percent);
    const barWidth = percentFull ? `${percentFull.toFixed(2)}%` : "0.00%";
    const color = this.percentToColor(percentFull);
    const colorStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    const fillStyle = {width: barWidth, backgroundColor: colorStyle};
    const textStyle = {color: colorStyle};

    let fillBarChildren = [
      <div className="progressBarText textOverlay">
        {this.props.children}
      </div>
    ];
    let lastChildren = [];

    if (percentFull >= 70) {
      fillBarChildren.push(
        <div className="progressBarPercent textOverlay">
          {barWidth}
        </div>
      )
    } else {
      lastChildren.push(
        <div className="progressBarPercent" style={textStyle}>
          {barWidth}
        </div>
      )
    }

    return (
      <div className="progressBar">
        <div className="progressFill" style={fillStyle}>
          {fillBarChildren}
        </div>
        <div className="progressBarText" style={textStyle}>
          {this.props.children}
        </div>
        {lastChildren}
      </div>
    );
  }
}

export default ProgressBar;
