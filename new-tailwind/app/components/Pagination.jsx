import React, { useState } from 'react';
import './Pagination.css'; // Import your CSS file for styling

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [displayedPages, setDisplayedPages] = useState([1, 2, 3]);

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);

    if (page >= 3) {
      setDisplayedPages([page - 1, page, page + 1]);
    } else {
      setDisplayedPages([1, 2, 3]);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];

    if (currentPage > 1) {
      buttons.push(
        <button key="prev" onClick={() => handlePageClick(currentPage - 1)}>
          Prev
        </button>
      );
    }

    displayedPages.forEach((page) => {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      );
    });

    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => handlePageClick(currentPage + 1)}>
          Next
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination-container">
      {currentPage > 2 && (
        <>
          <button onClick={() => handlePageClick(1)}>1</button>
          {currentPage > 3 && <button disabled>...</button>}
        </>
      )}

      {renderPageButtons()}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <button disabled>...</button>}
          <button onClick={() => handlePageClick(totalPages)}>{totalPages}</button>
        </>
      )}
    </div>
  );
};

export default Pagination;
