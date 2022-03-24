import { FunctionComponent } from 'react';
import styles from './Panel.module.scss';

interface Props {
  children?: React.ReactNode;
}

const Panel: FunctionComponent<Props> = ({ children }) => {
  return <div className={styles.panel}>{children}</div>;
};

export default Panel;
