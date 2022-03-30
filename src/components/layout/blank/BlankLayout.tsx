import { FC, ReactNode } from 'react';
import styles from './BlankLayout.module.scss';

interface Props {
  children: ReactNode;
}

const BlankLayout: FC<Props> = ({ children }) => (
  <div className={styles.layout}>
    <div className={styles.content}>{children}</div>
  </div>
);

export default BlankLayout;
