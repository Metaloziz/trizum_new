import Image from 'next/image';
import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import paginationImage from '@svgs/next-pagination.svg';
import styles from './Pagination.module.scss';

interface Props {
  initialPage?: number;
  marginPagesDisplayed?: number;
  pageCount: number;
  pageRangeDisplayed?: number;
  // onChange: ({ selected }: { selected: number }) => void;
  currentItems?: number;
  item?: number;
}

const Pagination: FC<Props> = (props) => {
  const {
    initialPage,
    marginPagesDisplayed,
    pageCount,
    pageRangeDisplayed,
    // onChange,
  } = props;
  return (
    <div>
      {/* <ReactPaginate
        initialPage={initialPage}
        marginPagesDisplayed={marginPagesDisplayed}
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        // onPageChange={onChange}
        containerClassName={styles.pagination}
        activeClassName={styles.paginationActive}
        pageLinkClassName={styles.paginationLink}
        breakLinkClassName={styles.paginationBreakLink}
        nextLinkClassName={styles.paginationNextLink}
        previousLinkClassName={styles.paginationPrevLink}
        pageClassName={styles.paginationItem}
        breakClassName={styles.paginationBreakItem}
        nextClassName={styles.paginationNextItem}
        previousClassName={styles.paginationPrevItem}
        previousLabel={
          <div className={styles.btnPrev}>
            <Image src={paginationImage} alt="Next" width={7} height={10} />
          </div>
        }
        nextLabel={
          <div>
            <Image src={paginationImage} alt="Next" width={7} height={10} />
          </div>
        }
      /> */}
    </div>
  );
};

export default Pagination;
