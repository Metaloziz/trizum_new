import { link } from 'fs';

import { FC } from 'react';

import styles from './Footer.module.scss';

import Navigation from 'components/navigation/Navigation';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type Props = Record<string, unknown>;

const Footer: FC<Props> = props => {
  const copyright = `© NextJS ${new Date().getFullYear()}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.copy}>{copyright}</div>

      <nav>
        <Navigation activeClassName={styles.active} links={[]} />
      </nav>
    </footer>
  );
};

export default Footer;
