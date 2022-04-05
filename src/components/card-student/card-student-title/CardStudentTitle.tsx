import React, { FC } from 'react';
import styles from './CardStudentTitle.module.scss';

interface Props {
  children: React.ReactNode;
}

const CardStudentTitle: FC<Props> = ({ children }) => {
  return <h3 className={styles.title}>{children}</h3>;
};

export default CardStudentTitle;
