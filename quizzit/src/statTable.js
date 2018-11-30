import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style/statDisplays.css';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.createInnerCell = this.createInnerCell.bind(this);
    this.createHeaders = this.createHeaders.bind(this);
    this.createRow = this.createRow.bind(this);
  }

  createInnerCell(cellMeta) {
    return "href" in cellMeta
           ? (<Link to={cellMeta.href}>
                {cellMeta.text}
              </Link>)
           : (<div>{cellMeta.text}</div>);
  }

  createHeaders(headers) {
    return (
      <tr>
        {headers.map((headerMeta) => {
          return (
            <th>
              { this.createInnerCell(headerMeta) }
            </th>
          );
        })}
      </tr>
    );
  }

  createRow(leadMeta, data, isTarget) {
    let regularCount = data.length;
    const indices = [...Array(data.length).keys()];

    let dataCells = indices.map((ind) => {
      const text = data[ind];
      const head  = this.props.headers[ind + 1].text;

      let className = "";
      if (isTarget([leadMeta].concat(data), head, text)) {
        regularCount -= 1.0;
        className = "target";
      }
      return (
        <td className={className}>
          {text}
        </td>
      )});

      console.log(leadMeta, data);

    const totalCount = data.length;
    const percentage = (regularCount * 100.0) / totalCount;

    return (
      <tr>
        <td>
          {this.createInnerCell(leadMeta)}
        </td>
        {dataCells}
        <td className="percentReport">
          <div>
            {`${percentage.toFixed(2)}%`}
          </div>
        </td>
      </tr>
    )
  }

  render() {
    const heads = this.props.headers;
    const cells = this.props.data;

    const absentMark = "A";
    const classGenerator = (cell) => {
      return cell === absentMark ? "absent" : "";
    }

    return (
      <table className="displayTable">
        <thead>
        </thead>
        <tbody>
          {this.createHeaders(heads)}
          {cells.map((row) => this.createRow(row[0], row.splice(1),
                                             this.props.targetter))}
        </tbody>
      </table>
    );
  }
}
