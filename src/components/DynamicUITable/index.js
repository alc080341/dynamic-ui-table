import React from "react";
import { useState, useRef, useEffect } from "react";
import "./dynamic-ui-table.css";

export default function DynamicUITable(props) {
  const [headers, updateHeaders] = useState(props.headers || []);
  const [data, updateData] = useState(props.data || []);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // ### DEFAULT SORT STATE
  const [sortCol, setSortColIndex] = useState({
    colIndex: -1,
    sortOrder: "asc",
  });

  // ### DEFAULT PAGINATION STATE
  const [paginationState, setPaginationState] = useState({
    currentPage: 1,
    noOfRowsPerPage: 5,
    noOfPages: 0,
    pagedData: [],
  });
  useEffect(() => {
    let currentRowsPerPage = paginationState.noOfRowsPerPage ? paginationState.noOfRowsPerPage : 5; 
    onSetPaginationState(1, currentRowsPerPage);
  }, [data]);

  // ### SORT FUNCTIONS
  const sortColumn = (index) => {
    if (headers) {
      const accessor = headers[index].accessor;
      let newCurrentSortCol = sortCol;

      // ### SET INDEX (COLUMN) OF NEW SORT ORDER / AS WELL AS DIRECTION ASC/DESC
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

      // ### SORT THE DATA ON THE COLUMN
      let newData = [...data];
      newData = newData.sort((a, b) => {
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

  // ### PAGED DATA FUNCTIONS
  const onSetPaginationState = (currentPage, noOfRowsPerPage) => {
    let pagedData = [];
    let newCurrentPage = currentPage
      ? currentPage
      : paginationState.currentPage;
    let newNoOfRowsPerPage = noOfRowsPerPage
      ? noOfRowsPerPage
      : paginationState.noOfRowsPerPage;
    newNoOfRowsPerPage = parseInt(newNoOfRowsPerPage);
    let newNoOfPages = 0;
    for (let i = 1; i < data.length; i += newNoOfRowsPerPage) {
      newNoOfPages++;
      if (newNoOfPages === newCurrentPage) {
        let startOfRecord = i - 1;
        let endOfRecord = startOfRecord + newNoOfRowsPerPage;
        pagedData = data.slice(startOfRecord, endOfRecord);
      }
    }

    let newPaginationState = {
      currentPage: newCurrentPage,
      noOfPages: newNoOfPages,
      noOfRowsPerPage: newNoOfRowsPerPage,
      pagedData: pagedData,
    };
    setPaginationState(newPaginationState);
  };

  // ### RENDER TABLE TO UI
  return (
    <>
      <Pagination
        currentPage={paginationState.currentPage}
        noOfRowsPerPage={paginationState.noOfRowsPerPage}
        noOfPages={paginationState.noOfPages}
        onSetPaginationState={onSetPaginationState}
      />
      <div className="dynamic-ui-table-outer">
        <CreateTable
          headers={headers}
          data={paginationState.pagedData}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragDrop={onDragDrop}
          sortColumn={sortColumn}
          isDraggingOver={isDraggingOver}
          sortCol={sortCol}
        />
      </div>
    </>
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
                const arrowType =
                  sortCol.sortOrder === "asc" ? `&#x2191` : `&#x2193`;
                const res = new DOMParser().parseFromString(
                  arrowType,
                  "text/html"
                ).body.textContent;
                sortArrow = res;
              } else {
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
                  <span>{sortArrow}</span>
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

function Pagination(props) {
  let btns = [];

  const onSetPage = (currentPage) => {
    props.onSetPaginationState(currentPage);
  };

  const onSetRows = (event) => {
    if (
      !isNaN(event.target.value) &&
      event.target.value !== "" &&
      event.target.value > 0
    ) {
      props.onSetPaginationState(1, event.target.value);
    }
  };

  // ### CHECK NO OF PAGES / ADD BUTTONS / ALSO ADD ACTIVE PAGE NUMBER
  if (props.noOfPages > 1) {
    for (let i = 1; i < props.noOfPages + 1; i++) {
      if (props.currentPage === parseInt(i))
        btns.push(
          <span
            key={i}
            onClick={() => {
              onSetPage(i);
            }}
            className="page-no-btn active"
          >
            {i}
          </span>
        );
      else
        btns.push(
          <span
            key={i}
            onClick={() => {
              onSetPage(i);
            }}
            className="page-no-btn"
          >
            {i}
          </span>
        );
    }
  }

  return (
    <>
      <div className="pagination">
        <span key="page-selector" className="page-selector">
          Rows per page:
          <input
            key="page-input"
            type="number"
            min="1"
            defaultValue={props.noOfRowsPerPage}
            onChange={onSetRows}
          />
        </span>
        <span>{btns}</span>
      </div>
    </>
  );
}
