import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./utils";
import "./dashboardTable.module.css";
import Modal from "react-modal";
import { FaPen } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { GlobalContext } from "../../context/GlobalState";

import "react-datepicker/dist/react-datepicker.css";

const DashboardTable = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [createdAt, setDate] = useState(new Date());
  const [_id, setId] = useState(0);

  const { dashboards, editDashboard } = React.useContext(GlobalContext);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const openModal = (row) => {
    const row_data = row;
    setId(row_data._id);
    setName(row_data.name);
    setDate(new Date(row_data.createdAt));
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  Modal.setAppElement("#root");

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dashboards, [dashboards]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const { pageIndex } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    editDashboard({ _id, name, createdAt });
    console.log("dashboard edited", dashboards);
    closeModal();
  };

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td>{cell.render("Cell")}</td>;
                })}
                <td key={index}>
                  <FaPen
                    style={{ color: "green", marginRight: "10px" }}
                    onClick={() => {
                      openModal(row.original);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          <strong>
            Page {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Make Changes</h2>
        <button
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            border: "none",
            background: "none",
            fontSize: "1.5rem",
          }}
          onClick={closeModal}
        >
          x
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>Date:</label>
          <DatePicker selected={createdAt} onChange={(date) => setDate(date)} />
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </>
  );
};

export default DashboardTable;
