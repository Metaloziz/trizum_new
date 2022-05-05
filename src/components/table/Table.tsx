import { FC } from 'react';
import { ListType } from '@components/moks-data/moks-data-table';
import styles from './Table.module.scss';

// interface IList {
//   id: number;
//   studentName: string;
//   teacherName: string;
//   registrationDate: string;
//   startDateAction: string;
//   endDateAction: string;
//   tariff: string;
//   paymentDate: string;
//   status: string;
//   legalAddress: string;
//   age: number;
// }

interface Props {
  // list?: IList[];
  list?: any[];
  colNames?: string[];
  width?: string;
  height?: string;
  loading: boolean;
}

const Table: FC<Props> = ({ list, colNames, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className={styles.tableContent}>
      {list !== undefined && list.length > 0 && (
        <table>
          <thead>
            <tr className={styles.th}>
              {' '}
              {colNames !== undefined &&
                colNames.length > 0 &&
                colNames.map((headerItem, index) => (
                  <th key={index}>{headerItem}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(list).map((obj, index) => (
              <tr key={index}>
                {Object.values(obj).map((value, index2) => (
                  <td key={index2}>{value as any}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
