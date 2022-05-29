import { FC, ReactNode } from 'react';
import Sidebar from '@components/sidebar/Sidebar';
import styles from './DefaultLayout.module.scss';
import Header from '../../header/Header';
import {GetServerSideProps} from "next";

interface Props {
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children,...rest }) => {
  return (

    <div className={styles.layout}>
      <Header className={styles.header}/>
      <Sidebar/>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default DefaultLayout;
