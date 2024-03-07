import React from "react";
import ReactDOM from "react-dom";
import "./dynamic-ui-table.css";

export default class DynamicUITable extends React.Component {
  // ### COMPONENT EXPECTS HEADERS AND DATA COLUMNS TO POPULATE ROW AND TD DATA IN TABLE
  constructor(props) {
    super(props);
    this.state = {
      headers: props.headers || [],
      data: props.data || [],
    };
  }

  render() {
    return <div className="dynamic-ui-table-outer">{createTable(this.state.headers, this.state.data)}</div>;
  }
}

function createTable(headers, data) {
  return (
    <table className="dynamic-ui-table">
      <thead>
        <tr>
          {Object.keys(headers).map((key, index) => (
            <th key={index}>
              <strong>{headers[key]}</strong>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="dynamic-ui-table-inner">
          {data.map((item, index) => (
            <tr>
              {Object.keys(item).map((key, index) => (
                <td key={index}>
                  <p>{item[key]}</p>
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
