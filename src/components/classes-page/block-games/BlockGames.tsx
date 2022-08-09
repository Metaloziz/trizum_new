import React from 'react';

import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';

import styles from './BlockGames.module.scss';

import groupStore from 'app/stores/groupStore';
import cardsGame from 'assets/svgs/cards.svg';
import fossilGame from 'assets/svgs/fossil.svg';
import starGame from 'assets/svgs/star.svg';
import Image from 'components/image/Image';
import Panel from 'components/panel/Panel';

const BlockGames = observer(() => {
  const { openModal, visibleGroup } = groupStore;

  return (
    <div className={styles.blockGames}>
      <div className={styles.componentPanelWrapper}>
        <Panel>Домашнее задание на 7 октября 2021</Panel>
      </div>
      <div className={styles.games}>
        <ul>
          <li>
            <Image src={fossilGame} width="32" height="32" alt="fossil" />
          </li>
          <li>игра 1</li>
        </ul>
        <ul>
          <li>
            <Image src={starGame} width="32" height="32" alt="star" />
          </li>
          <li>игра 2</li>
        </ul>
        <ul>
          <li>
            <Image src={cardsGame} width="32" height="32" alt="cards" />
          </li>
          <li>игра 3</li>
        </ul>
      </div>
      <Button onClick={() => openModal(visibleGroup?.id)}>Edit group</Button>
      <p className={styles.content}>
        Высокий уровень вовлечения представителей целевой аудитории является четким доказательством
        простого факта: реализация намеченных плановых заданий создаёт необходимость включения в
        производственный план целого ряда внеочередных мероприятий с учётом комплекса
        глубокомысленных рассуждений. Как принято считать, сторонники тоталитаризма в науке,
        превозмогая сложившуюся непростую экономическую ситуацию, своевременно верифицированы.
      </p>
    </div>
  );
});

export default BlockGames;
