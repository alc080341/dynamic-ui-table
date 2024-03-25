import React from "react";
import { useState } from "react";
import "./dynamic-ui-table.css";

export default function DynamicUITable(props) {
  const [headers, updateHeaders] = useState(props.headers || []);
  const [data, updateData] = useState(props.data || []);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [sortCol, setSortColIndex] = useState({
    colIndex: -1,
    sortOrder: "asc",
  });

  // ### SORT FUNCTIONS
  const sortColumn = (index) => {
    if (headers) {
      const accessor = headers[index].accessor;
      let newCurrentSortCol = sortCol;
      if (newCurrentSortCol.colIndex !== index) {
        newCurrentSortCol.colIndex = index;
        newCurrentSortCol.sortOrder = "desc";
        setSortColIndex(newCurrentSortCol);
      } else {
        newCurrentSortCol.sortOrder =
          newCurrentSortCol.sortOrder === "desc" ? "asc" : "desc";
        setSortColIndex({
          sortOrder: newCurrentSortCol.sortOrder,
          ...newCurrentSortCol,
        });
      }

      let newData = data.sort((a, b) => {
        let sortVal = 0;
        if (a[accessor] < b[accessor]) {
          sortVal = -1;
        } else if (a[accessor] > b[accessor]) {
          sortVal = 1;
        }

        if (newCurrentSortCol.sortOrder === "desc") {
          sortVal = sortVal * -1;
        }
        return sortVal;
      });
      updateData(newData);
    }
  };

  // ### DRAGGABLE FUNCTIONS
  const onDragStart = (e, i) => {
    e.dataTransfer.setData("text/plain", i);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const onDragDrop = (e, target) => {
    e.preventDefault();
    let src = e.dataTransfer.getData("text/plain");
    let newHeaders = [...headers];
    let srcHdr = newHeaders[src];
    let trgtHdr = newHeaders[target];
    let currentIndex = srcHdr.index;
    srcHdr.index = trgtHdr.index;
    trgtHdr.index = currentIndex;
    newHeaders.sort((a, b) => a.index - b.index);
    updateHeaders(newHeaders);
    setIsDraggingOver(false);
  };

  // ### RENDER TABLE TO UI
  return (
    <div className="dynamic-ui-table-outer">
      <CreateTable
        headers={headers}
        data={data}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragDrop={onDragDrop}
        sortColumn={sortColumn}
        isDraggingOver={isDraggingOver}
        sortCol={sortCol}
      />
    </div>
  );
}

function CreateTable(props) {
  const onDragStart = (e, index) => {
    props.onDragStart(e, index);
  };
  const onDragOver = (e) => {
    props.onDragOver(e);
  };
  const onDragDrop = (e, index) => {
    props.onDragDrop(e, index);
  };

  let headers = props.headers;
  let data = props.data;
  let isDraggingOver = props.isDraggingOver;
  let sortCol = props.sortCol;
  let dragOverStyle = {
    border: isDraggingOver ? "5px dashed #ccc" : "5px solid transparent",
    backgroundColor: isDraggingOver ? "#f0f0f0" : "transparent", // Apply background color when dragging over
  };

  return (
    <>
      <table className="dynamic-ui-table">
        <thead>
          <tr>
            {headers.map((hdr) => {
              let sortArrow = "";
              if (sortCol.colIndex === hdr.index) {
                const arrowType = sortCol.sortOrder === "asc" ? `&#x2191` : `&#x2193`; 
                const res = new DOMParser().parseFromString(arrowType, 'text/html').body.textContent;
                sortArrow = res;
              } else 
              {
                sortArrow = "";
              }
              return (
                <th
                  key={hdr.title + "hdr"}
                  onDragStart={(e) => onDragStart(e, hdr.index)}
                  onDragOver={(e) => onDragOver(e)}
                  onDrop={(e) => onDragDrop(e, hdr.index)}
                  onClick={() => props.sortColumn(hdr.index)}
                  index={hdr.index}
                >
                  <span
                    style={dragOverStyle}
                    className="dynamic-table-title"
                    draggable
                  >
                    <strong>{hdr.title}</strong>
                  </span>
                  <span>
                    {sortArrow}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="dynamic-ui-table-inner">
          {data.map((item) => {
            let { index, ...newObj } = item;
            return (
              <tr key={item.index + "-tr"}>
                {headers.map((hdr) => (
                  <td
                    key={item[hdr.accessor] + "-" + item.index}
                    index={item.index}
                  >
                    <span>
                      <p>{item[hdr.accessor]}</p>
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
