import React, { useState } from "react";
import "./Pagination.css";

export default function Pagination({ pageNumbers, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (number) => {
    setCurrentPage(number);
    onPageChange(number);
  };

  return (
    <nav className="pagination-nav">
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`page-btn ${currentPage === number ? "active" : ""}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
