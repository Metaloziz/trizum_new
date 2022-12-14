import { FC, ReactNode } from 'react';

import classNames from 'classnames';

import styles from './PageSection.module.scss';

interface Props {
  children: ReactNode;
  alternate?: boolean;
}

const Section: FC<Props> = ({ children, alternate }) => (
  <section className={classNames(styles.section, { [styles.alternate]: alternate })}>
    {children}
  </section>
);

export default Section;
