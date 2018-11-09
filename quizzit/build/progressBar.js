var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var ProgressBar = function (_Component) {
  _inherits(ProgressBar, _Component);

  function ProgressBar(props) {
    _classCallCheck(this, ProgressBar);

    var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, props));

    _this.percentToColor = _this.percentToColor.bind(_this);
    return _this;
  }

  _createClass(ProgressBar, [{
    key: "percentToColor",
    value: function percentToColor(percent) {
      var baseZero = [255, 0, 0];
      var baseFifty = [223, 223, 50];
      var baseHundred = [52, 220, 106];
      var averageColor = [];

      var low = percent < 50 ? baseZero : baseFifty;
      var high = percent < 50 ? baseFifty : baseHundred;

      var percentDec = percent == 100 ? 1.0 : percent % 50.0 / 50.0;
      for (var i = 0; i < 3; i++) {
        var avg = high[i] * percentDec + low[i] * (1.0 - percentDec);
        averageColor.push(avg);
      }

      return averageColor;
    }
  }, {
    key: "render",
    value: function render() {
      var percentFull = this.props.percent;
      var barWidth = percentFull + "%";
      var color = this.percentToColor(percentFull);
      var colorStyle = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";

      var fillStyle = { width: barWidth, backgroundColor: colorStyle };
      var textStyle = { color: colorStyle };

      var fillBarChildren = [React.createElement(
        "div",
        { className: "progressBarText textOverlay" },
        this.props.children
      )];
      var lastChildren = [];

      if (percentFull >= 70) {
        fillBarChildren.push(React.createElement(
          "div",
          { className: "progressBarPercent textOverlay" },
          barWidth
        ));
      } else {
        lastChildren.push(React.createElement(
          "div",
          { className: "progressBarPercent", style: textStyle },
          barWidth
        ));
      }

      return React.createElement(
        "div",
        { className: "progressBar" },
        React.createElement(
          "div",
          { className: "progressFill", style: fillStyle },
          fillBarChildren
        ),
        React.createElement(
          "div",
          { className: "progressBarText", style: textStyle },
          this.props.children
        ),
        lastChildren
      );
    }
  }]);

  return ProgressBar;
}(Component);

export default ProgressBar;