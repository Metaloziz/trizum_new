import React, { FC } from 'react';

import cn from 'classnames';

import styles from './TableCol.module.scss';

type Props = {
  value?: string;
  isHeader?: boolean;
};

const TableCol: FC<Props> = props => {
  const { value, isHeader } = props;
  return (
    <div
      className={
        (isHeader && cn(styles.col, styles.col_header)) ||
        cn(styles.col, value && styles.col_filled)
      }
    >
      {value || ''}
    </div>
  );
};
TableCol.defaultProps = {
  value: '',
  isHeader: false,
};

export default TableCol;
