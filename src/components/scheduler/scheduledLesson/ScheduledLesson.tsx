import Image from 'next/image';
import React from 'react';
import styles from './ScheduledLesson.module.scss';

const ScheduledLesson = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.information}>
        <span>Класс: 1А</span>
        <span>Урок: Второй</span>
        <span>Время: 8:30 - 9:15</span>
      </div>
      <div className={styles.icons}>
        <span>
          <Image src='/img/delete.svg' alt='Delete Icon' width={20} height={20} />
        </span>
        <span>
          <Image src='/img/settings.svg' alt='Settings Icon' width={20} height={20} />
        </span>
      </div>
    </div>
  );
};

export default ScheduledLesson;
