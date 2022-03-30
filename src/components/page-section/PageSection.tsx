import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import styles from './PageSection.module.scss';

interface Props {
  children: ReactNode;
  alternate?: boolean;
}

const Section: FC<Props> = ({ children, alternate }) => (
  <section className={classNames(styles.section, { [styles.alternate]: alternate })}>{children}</section>
);

export default Section;
