import React, { FC } from 'react';

import ReportPage from '@components/report-page';

import styles from './AdminMain.module.scss';

type Props = Record<string, unknown>;

const AdminMain: FC<Props> = props => (
  <div className={styles.container}>
    <ReportPage />
  </div>
);

export default AdminMain;
