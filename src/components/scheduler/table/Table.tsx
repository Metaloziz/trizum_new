import React, { FunctionComponent } from 'react';
import styles from './Table.module.scss';

interface IList {
  id: number;
  name: string;
  age: number;
}

interface Props {
  list?: IList[];
  colNames?: string[];
  width?: string;
  height?: string;
}

export const Table: FunctionComponent<Props> = ({ list, colNames }) => {
  return (
    <div className={styles.table}>
      {list !== undefined && list.length > 0 && (
        <table cellSpacing={'0'} style={{ width: 'auto', height: 'auto' }}>
          <thead>
            <tr className={styles.th}>
              {colNames !== undefined && colNames.length > 0 && colNames.map((headerItem, index) => <th key={index}>{headerItem}</th>)}
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
