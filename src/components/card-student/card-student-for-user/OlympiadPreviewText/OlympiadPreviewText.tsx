import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import Button from 'components/button/Button';
import styles from 'components/card-student/card-student-for-user/CardStudentForUser.module.scss';
import Panel from 'components/panel/Panel';

type Props = {
  onClick: () => void;
};

export const OlympiadPreviewText: FC = () => {
  const navigate = useNavigate();

  const olympiadId = 1;
  const userId = 1;

  const onParticipateClick = () => {
    navigate(`${AppRoutes.Olympiads}`);
  };

  return (
    <div className={styles.modalContent}>
      <Panel className={styles.panel}>Олимпиада - неделя антипазла</Panel>
      <div>
        <p>
          Высокий уровень вовлечения представителей целевой аудитории является четким
          доказательством простого факта: реализация намеченных плановых заданий создаёт
          необходимость включения в производственный план целого ряда внеочередных мероприятий с
          учётом комплекса глубокомысленных рассуждений. Как принято считать, сторонники
          тоталитаризма в науке, превозмогая сложившуюся непростую экономическую ситуацию,
          своевременно верифицированы.
        </p>
      </div>
      <div className={styles.btn}>
        <Button onClick={onParticipateClick}>Принять участие в олимпиаде</Button>
      </div>
    </div>
  );
};
