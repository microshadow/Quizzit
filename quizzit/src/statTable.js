import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style/statDisplays.css';


function highlightWrongAnswer(row, col, ind) {
  const cell = row[ind];
  const qLabel = col;

  const qIndex = this.state.quiz.questions.findIndex((q) => q.display === qLabel);
  if (qIndex < 0) {
    return false;
  }
  const question = this.state.quiz.questions[qIndex];

  const answer = question.options.find((a) => a.display === cell.text);
  if (!answer) {
    return true;
  } else {
    const answerId = answer._id;
    return !question.correct.includes(answerId);
  }
}


class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnHeads: []
    };

    this.createInnerElem = this.createInnerElem.bind(this);
    this.createHeaders = this.createHeaders.bind(this);
    this.createRow = this.createRow.bind(this);
  }

  createInnerElem(cellMeta) {
    if (!cellMeta) {
      return (<div/>);
    } else {
      return "href" in cellMeta
             ? (<Link to={cellMeta.href}>
                  {cellMeta.text}
                </Link>)
             : (<div>{cellMeta.text}</div>);
    }
  }

  createHeaders(headers) {
    return (
      <tr>
        {headers.map((headerMeta) => {
          return (
            <th>
              { this.createInnerElem(headerMeta) }
            </th>
          );
        })}
      </tr>
    );
  }

  createRow(index, heads, rowData, tails) {
    const tailValues = tails.map((tail) => {
      return {text: tail.generate(index, rowData)};
    });

    const textLabels = heads.concat(rowData).concat(tailValues);
    const indices = [...Array(textLabels.length).keys()];

    const dataCells = indices.map((ind) => {
      const cell = textLabels[ind];
      const head = this.state.columnHeads[ind].text;

      const className = this.props.highlight(textLabels, head, ind) ? "target" : "";
      return (
        <td className={className}>
          {this.createInnerElem(cell)}
        </td>
      );
    });

    return (
      <tr>
        {dataCells}
      </tr>
    );
  }

  render() {
    const isString = (obj) => typeof obj === "string" || obj instanceof String;
    const convertToObj = (unit) => isString(unit) ? {text: unit} : unit;

    const extractColHeads = (aux) => aux.map((auxCol) => auxCol.colHead);
    const heads = extractColHeads(this.props.heads)
                  .concat(this.props.columnHeads)
                  .concat(extractColHeads(this.props.tails))
                  .map(convertToObj);
    const cells = this.props.data.map((row) => row.map(convertToObj));

    const rowIndices = [...Array(cells.length).keys()];

    const columnHeads = heads;

    return (
      <div className="displayTable">
        <div className="tableTitle">
          {this.props.title}
        </div>
        <table>
          <thead>
            {this.createHeaders(heads)}
          </thead>
          <tbody>
            {rowIndices.map((ind) => this.createRow(ind,
                                                    this.props.heads.map((head) => convertToObj(head.rows[ind])),
                                                    cells[ind],
                                                    this.props.tails))}
          </tbody>
        </table>
      </div>
    );
  }
}

export { Table, highlightWrongAnswer };
