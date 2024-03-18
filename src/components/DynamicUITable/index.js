import React from "react";
import "./dynamic-ui-table.css";

export default function DynamicUITable(props) {

  const onDragStart = (e, index) => {
    props.onDragStart(e, index)
  };

  const onDragOver = (e) => {
    props.onDragOver(e)
  };

  const onDragDrop = (e, index) => {
    props.onDragDrop(e, index)
  };

    return <div className="dynamic-ui-table-outer">
        <CreateTable 
          headers={props.headers} 
          data={props.data}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragDrop={onDragDrop}
        />
      </div>;
  
}

function CreateTable(props) {

  const onDragStart = (e, index) => {
    props.onDragStart(e, index)
  };
  const onDragOver = (e) => {
    props.onDragOver(e)
  };
  const onDragDrop = (e, index) => {
    props.onDragDrop(e, index)
  };

  let headers = props.headers;
  let data = props.data;

  const keysToOmit = ['index']; 
  return (
    <table className="dynamic-ui-table">
      <thead>
        <tr>
          {headers.map((hdr) => (
            <th key={hdr.title + "hdr"}
              onDragStart={(e)=> onDragStart(e, hdr.index)} 
              onDragOver={(e) => onDragOver(e)} 
              onDrop={(e)=> onDragDrop(e, hdr.index)}
              index={hdr.index} 
           >
              <span draggable><strong>{hdr.title}</strong></span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="dynamic-ui-table-inner">
          {data.map((item) => {
            let { index, ...newObj } = item;
            return (
              <tr key={item.index + "-tr"}>
              {
                  Object.keys(newObj).map((key) => (
                  <td key={item[key] + "-" + item.index} 
                  index={item.index}
                >
                  <span><p>{item[key]}</p></span>
                </td>
              ))}
            </tr>
            )
        })}
      </tbody>
    </table>
  );
}
