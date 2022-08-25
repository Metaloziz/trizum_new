import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import styles from './BlockGames.module.scss';

import groupStore from 'app/stores/groupStore';
import cardsGame from 'assets/svgs/cards.svg';
import fossilGame from 'assets/svgs/fossil.svg';
import starGame from 'assets/svgs/star.svg';
import Image from 'components/image/Image';
import Panel from 'components/panel/Panel';

const BlockGames = observer(() => {
  const { selectedGroup } = groupStore;

  const works = selectedGroup?.course.works;
  let result: string;
  const setImg = (id: number) => {
    if (id === 0 || id > 2) {
      result = fossilGame;
    } else if (id === 1) {
      result = starGame;
    } else if (id === 2) {
      result = cardsGame;
    }
    return result;
  };
  return (
    <div className={styles.blockGames}>
      <div className={styles.componentPanelWrapper}>
        <Panel>Домашнее задание на 7 октября 2021</Panel>
      </div>
      <div className={styles.games}>
        {works?.map((item, id) => (
          <ul key={item.id}>
            <li>
              <Image src={setImg(id)} width="32" height="32" alt="fossil" />
            </li>
            <li>{item.work.title}</li>
          </ul>
        ))}
      </div>
      {/* <Button onClick={() => openModal(selectedGroup?.id)}>Edit group</Button> */}
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
