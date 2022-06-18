import { FC, ReactNode } from 'react';

import InformationItem from '@components/information-item/InformationItem';
import { ListType } from '@components/moks-data/moks-data-table';

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
      {list !== undefined && list.length > 0 && (
        <table>
          <thead>
            <tr>
              {' '}
              {colNames !== undefined &&
                colNames.length > 0 &&
                colNames.map((headerItem, index) => <th key={index}>{headerItem}</th>)}
            </tr>
          </thead>
          <tbody>
            {children}
            {/* {Object.values(list).map((obj, index) => (
              <tr key={index}>
                {Object.values(obj).map((value, index2) => {
                  if (typeof value === 'function') {
                    return <td key={index2}>{value()}</td>;
                  }
                  return <td key={index2}>{value as any}</td>;
                })}
              </tr>
            ))} */}
          </tbody>
        </table>
      )}
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
