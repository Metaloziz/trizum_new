import PaginationArrows from '@components/pagination-arrows/PaginationArrows';
import classNames from 'classNames';
import { FC, useState } from 'react';
import { ListType } from '@components/moks-data/moks-data-table';
import PaginationNextArrows from '@components/pagination-next-arrow/PaginationNextArrows';
import PaginationPrevArrows from '@components/pagination-prev-arrows/PaginationPrevArrows';
import styles from './CustomPagination.module.scss';

interface Props {
  currentItem: ListType[];
  currentPage: number;
  count: number;
  total: number;
  paginate: (value: number) => void;
  prev: () => void;
  next: () => void;
}

const CustomPagination: FC<Props> = (props) => {
  const { currentItem, currentPage, count, total, paginate, prev, next } =
    props;
  const pageNumbers = [];
  const countPage = Math.ceil(total / count);
  for (let i = 1; i <= countPage; i++) {
    pageNumbers.push(i);
  }
  const [activeStepCount, setActiveStepCount] = useState(1);
  const navigate = (page: number, cb: () => void) => {
    setActiveStepCount(page);
    cb();
  };
  return (
    <div className={styles.paginationWrapper}>
      <button
        disabled={currentPage === 1}
        className={styles.prev}
        onClick={() => {
          navigate(activeStepCount - 1, () => prev());
        }}
      >
        <PaginationPrevArrows isActive={activeStepCount > 1} />
      </button>
      <ul className={styles.list}>
        {pageNumbers.map((item, i) => (
          <li
            className={classNames(styles.paginationItem, {
              [styles.activePaginate]: item === activeStepCount,
            })}
            key={item}
            onClick={() => {
              navigate(i + 1, () => {
                paginate(item);
              });
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <button
        disabled={currentItem.length !== count}
        className={styles.next}
        onClick={() => {
          navigate(activeStepCount + 1, () => next());
        }}
      >
        <PaginationNextArrows isActive={activeStepCount < countPage} />
      </button>
    </div>
  );
};

export default CustomPagination;
