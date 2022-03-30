import React from 'react';
import styles from './TabsPanel.module.scss';

const TabsPanel = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.button}>
        <span>Группа 1А</span>
      </div>
      <div className={`${styles.button} ${styles.active}`}>
        <span>Группа 1Б</span>
      </div>
      <div className={styles.button}>
        <span>Группа 1С</span>
      </div>
      <div className={styles.button}>
        <span>Группа 2А</span>
      </div>
      <div className={styles.button}>
        <span>Группа 2Б</span>
      </div>
      <div className={styles.button}>
        <span>Группа 2C</span>
      </div>
    </div>
  );
};

export default TabsPanel;
