import { FC, ReactNode } from 'react';

import styles from './Table.module.scss';

interface IList {
  id?: number;
  studentName?: string;
  teacherName?: string;
  registrationDate?: string;
  startDateAction?: string;
  endDateAction?: string;
  tariff?: string;
  paymentDate?: string;
  status?: string;
  legalAddress?: string;
  age?: number;
}

interface Props {
  list?: IList[];
  // list?: ListType;
  colNames?: string[];
  children?: ReactNode;
  // width?: string;
  // height?: string;
  loading?: boolean;
}

const Table: FC<Props> = props => {
  const { list, colNames, loading, children } = props;
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className={styles.tableContent}>
      <table>
        <thead>
          <tr>
            {' '}
            {colNames !== undefined &&
              colNames.length > 0 &&
              colNames.map((headerItem, index) => <th key={index}>{headerItem}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  list: [],
  colNames: [],
  loading: false,
  children: undefined,
};

export default Table;
