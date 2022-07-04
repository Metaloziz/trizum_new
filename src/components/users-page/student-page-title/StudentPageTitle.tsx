import React, { FC } from 'react';

import styles from './StudentPageTitle.module.scss';

interface Props {
  children?: React.ReactNode;
}

const StudentPageTitle: FC<Props> = ({ children }) => <h2 className={styles.title}>{children}</h2>;

export default StudentPageTitle;
