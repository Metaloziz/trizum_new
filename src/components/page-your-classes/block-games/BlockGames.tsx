import Image from 'next/image';
import React from 'react';
import Panel from '@components/panel/Panel';
import styles from './BlockGames.module.scss';

const BlockGames = () => {
  return (
    <div className={styles.blockGames}>
      <div className={styles.componentPanelWrapper}>
        <Panel>Домашнее задание на 7 октября 2021</Panel>
      </div>
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
        Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: реализация намеченных
        плановых заданий создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса
        глубокомысленных рассуждений. Как принято считать, сторонники тоталитаризма в науке, превозмогая сложившуюся непростую экономическую
        ситуацию, своевременно верифицированы.
      </p>
    </div>
  );
};

export default BlockGames;
