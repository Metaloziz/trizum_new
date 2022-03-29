import { FunctionComponent } from 'react';
import styles from './AdminInfoItem.module.scss';

interface Props {
  title: string;
  value: number;
}

const AdminInfoItem: FunctionComponent<Props> = ({ title, value }) => {
  return (
    <div className={styles.content}>
      <p>{title}</p>
      <span>{value}</span>
    </div>
  );
};

export default AdminInfoItem;
