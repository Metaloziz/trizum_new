import { useMemo } from 'react';

type Pagination = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number | string;
};
const DOTS = '...';
export const usePagination = (data: Pagination) => {
  const { totalCount, pageSize, siblingCount = 1, currentPage } = data;

  const range = (start: number, end: number) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
  };

  return useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex =
      typeof currentPage === 'number' ? Math.max(currentPage - siblingCount, 1) : 1;
    const rightSiblingIndex =
      typeof currentPage === 'number' ? Math.min(currentPage + siblingCount, totalPageCount) : 1;

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);
};
