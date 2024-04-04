import React from "react";
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss';

function Pagination({onChangePage, maxPage}) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={maxPage}
    //   forcePage={currentPage - 1}
    />
  );
}

export default Pagination;