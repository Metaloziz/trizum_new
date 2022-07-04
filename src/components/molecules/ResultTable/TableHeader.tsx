import React, { FC } from 'react';

import styles from './ResultTable.module.scss';

import TableCol from 'components/molecules/ResultTable/TableCol/TableCol';

type Props = {
  values: string[];
};
const TableHeader: FC<Props> = props => {
  const { values } = props;
  return (
    <div className={styles.header}>
      {values.map(value => (
        <TableCol value={value} isHeader key={value} />
      ))}
    </div>
  );
};

export default TableHeader;
