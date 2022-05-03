import { FC } from 'react';
import PaginationArrows from '@components/pagination-arrows/PaginationArrows';
import styles from './CustomPagination.module.scss';

interface Props {
  count: number;
  total: number;
  paginate: (value: number) => void;
  prev: () => void;
  next: () => void;
}

const CustomPagination: FC<Props> = ({
  count,
  total,
  paginate,
  prev,
  next,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / count); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationWrapper}>
      <button className={styles.prev} onClick={() => prev()}>
        <PaginationArrows />
      </button>
      <ul className={styles.list}>
        {pageNumbers.map((item) => (
          <li
            className={styles.paginationItem}
            key={item}
            onClick={() => paginate(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <button className={styles.next} onClick={() => next()}>
        <PaginationArrows />
      </button>
    </div>
  );
};

export default CustomPagination;
