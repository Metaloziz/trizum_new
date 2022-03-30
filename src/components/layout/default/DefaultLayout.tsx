import { FC, ReactNode } from 'react';
import Sidebar from '@components/sidebar/Sidebar';
import styles from './DefaultLayout.module.scss';
import Header from '../../header/Header';

interface Props {
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children }) => (
  <div className={styles.layout}>
    <Header className={styles.header} />
    <Sidebar />
    <div className={styles.content}>{children}</div>
  </div>
);

export default DefaultLayout;
