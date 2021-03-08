import React from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";

import GlobalFilter from "./GlobalFilter";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <>
      <GlobalFilter
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()} className="table mt-3">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.length ? (
            page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Нет данных</td>
            </tr>
          )}
        </tbody>
      </table>
      {pageOptions.length > 1 && (
        <ul className="pagination">
          <li class="page-item">
            <button
              className="page-link"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              &laquo;
            </button>
          </li>
          <li class="page-item">
            <button
              className="page-link"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              &lsaquo;
            </button>
          </li>
          <li class="page-item">
            <button
              className="page-link"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              &rsaquo;
            </button>
          </li>
          <li class="page-item">
            <button
              className="page-link"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              &raquo;
            </button>
          </li>
          <li class="page-item">
            <span>
              Page{" "}
              <strong>
                {state.pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
          </li>
        </ul>
      )}
    </>
  );
};

export default Table;
