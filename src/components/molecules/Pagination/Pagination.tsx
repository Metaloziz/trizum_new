import React, { FC } from 'react';

import cn from 'classnames';

import styles from './Pagination.module.scss';

import { usePagination } from 'hooks/usePagination';

const DOTS = '...';
type Props = {
  totalCount: number;
  currentPage: number | string;
  pageSize: number;
  siblingCount?: number;
  className?: string;
  onPageChange: (num: number) => void;
};

const Pagination: FC<Props> = props => {
  const { onPageChange, pageSize, currentPage, siblingCount = 1, totalCount, className } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const currentPageNum = Number(currentPage);

  if (currentPageNum === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPageNum + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPageNum - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={cn(styles.pagination, className)}>
      <li
        className={cn(styles.paginationItem, currentPageNum === 1 && styles.disabled)}
        onClick={onPrevious}
      >
        <div className={cn(styles.arrow, styles.arrowLeft)} />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className={styles.dots}>&#8230;</li>;
        }

        return (
          <li
            key={pageNumber}
            className={cn(
              styles.paginationItem,
              Number(pageNumber) === currentPageNum && styles.selected,
            )}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cn(
          styles.paginationItem,
          currentPageNum === Number(lastPage) && styles.disabled,
        )}
        onClick={onNext}
      >
        <div className={cn(styles.arrow, styles.arrowRight)} />
      </li>
    </ul>
  );
};

export default Pagination;
