import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Step.module.scss';

interface Props {
  initialPage?: number;
  marginPagesDisplayed?: number;
  pageCount: number;
  pageRangeDisplayed?: number;
  // onChange: ({ selected }: { selected: number }) => void;
  currentItems?: number;
  item?: number;
}

const Step: FC<Props> = ({ initialPage, marginPagesDisplayed, pageCount, pageRangeDisplayed }) => {
  return (
    <>
      <ReactPaginate
        initialPage={initialPage}
        marginPagesDisplayed={marginPagesDisplayed}
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        breakLabel={false}
        previousLabel={false}
        nextLabel={false}
        // onPageChange={onChange}
        containerClassName={styles.step}
        activeClassName={styles.stepActive}
        pageLinkClassName={styles.stepLink}
        breakLinkClassName={styles.stepBreakLink}
        nextLinkClassName={styles.stepNextLink}
        previousLinkClassName={styles.stepPrevLink}
        pageClassName={styles.stepItem}
        breakClassName={styles.stepBreakItem}
        // nextClassName={styles.stepNextItem}
        // previousClassName={styles.stepPrevItem}
      />
    </>
  );
};

export default Step;
