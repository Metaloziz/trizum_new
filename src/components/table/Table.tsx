import { FC } from 'react';
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
  fullName?: string;
  city?: string;
  dataInfo?: string;
  dataOgrn?: string;
  paymentAccount?: string;
  bankAccount?: string;
  nameBank?: string;
  infoBank?: string;
}

// interface INewList {
//   fullName: string;
//   city: string;
//   legalAddress: string;
//   dataInfo: string;
//   dataOgrn: string;
//   paymentAccount: string;
//   bankAccount: string;
//   nameBank: string;
//   infoBank: string;
// }

interface Props {
  // newList: INewList[];
  list: IList[];
  colNames?: string[];
  width?: string;
  height?: string;
}

const Table: FC<Props> = ({ list, colNames }) => {
  return (
    <div className={styles.tableContent}>
      {list !== undefined && list.length > 0 && (
        <table>
          <thead>
            <tr className={styles.th}>
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
                  <td key={index2}>{value}</td>
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
