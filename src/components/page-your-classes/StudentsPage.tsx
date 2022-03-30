import Image from 'next/image';
import React from 'react';
import CardStudent from '@components/page-your-classes/card-student/CardStudent';
import TabsPanel from '@components/page-your-classes/tabs-panel/TabsPanel';
import styles from './StudentsPage.module.scss';

const StudentsPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.panel}></div>
      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          <TabsPanel />
        </div>
        <div className={styles.box}>
          <div className={styles.games}>
            <ul>
              <li>
                <Image src={'/img/fossil.svg'} width={'30'} height={'30'} alt={'fossil'} />
              </li>
              <li>игра 1</li>
            </ul>
            <ul>
              <li>
                <Image src={'/img/star.svg'} width={'30'} height={'30'} alt={'star'} />
              </li>
              <li>игра 2</li>
            </ul>
            <ul>
              <li>
                <Image src={'/img/cards.svg'} width={'30'} height={'30'} alt={'cards'} />
              </li>
              <li>игра 3</li>
            </ul>
          </div>
          <p className={styles.content}>
            Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: реализация
            намеченных плановых заданий создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с
            учётом комплекса глубокомысленных рассуждений. Как принято считать, сторонники тоталитаризма в науке, превозмогая сложившуюся
            непростую экономическую ситуацию, своевременно верифицированы.
          </p>
        </div>
        <div className={styles.wrapperCardStudent}>
          <CardStudent />
          <CardStudent />
          <CardStudent />
          <CardStudent />
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
