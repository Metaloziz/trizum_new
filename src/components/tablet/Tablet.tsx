import React, { FC } from 'react';

import styles from './Tablet.module.scss';

type TabletProps = Record<string, unknown>;
const Tablet: FC<TabletProps> = props => {
  const { children } = props;
  return (
    <div className={styles.container}>
      <div className={styles.display}>
        <>
          {children}
          <div className={styles.tableBtn}>
            <div />
            <div />
          </div>
        </>
        <div className={styles.leftBtn} />
      </div>
    </div>
  );
};

export default Tablet;
