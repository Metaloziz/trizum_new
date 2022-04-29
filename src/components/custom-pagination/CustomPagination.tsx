import React, { FC } from 'react';

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
    <>
      <button onClick={() => prev()}>Prev</button>
      <ul style={{ display: 'flex', listStyleType: 'none' }}>
        {pageNumbers.map((item) => (
          <li
            key={item}
            style={{ padding: '5px', border: '1px solid #999' }}
            onClick={() => paginate(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <button onClick={() => next()}>Next</button>
    </>
  );
};

export default CustomPagination;
