import React, { FC } from 'react';

import TableCol from '@components/molecules/ResultTable/TableCol/TableCol';
import cn from 'classnames';

import styles from './TableRow.module.scss';

type Props = {
  title: string;
  values?: (string | undefined)[];
  isHeader?: boolean;
};

const TableRow: FC<Props> = props => {
  const { title, values, isHeader } = props;
  return (
    <div className={styles.wrapper}>
      <p className={cn(styles.title, isHeader && styles.title_bold)}>{title}</p>
      <div className={styles.row}>
        {values?.map(value => (
          <TableCol key={Math.random()} value={value} />
        ))}
      </div>
    </div>
  );
};

export default TableRow;
