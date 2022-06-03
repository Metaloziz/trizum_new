import React, {FC} from 'react';
import ScheduleDnD from "@components/schedule/ScheduleDnD";
import styles from './AdminMain.module.scss'

type Props = Record<string, unknown>

const AdminMain:FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <ScheduleDnD/>
    </div>
  );
};

export default AdminMain;
