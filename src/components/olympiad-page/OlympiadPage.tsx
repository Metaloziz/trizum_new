import React from 'react';

import styles from './OlympiadPage.module.scss';

import appStore from 'app/stores/appStore';
import Homework from 'components/homework/Homework';
import { games } from 'components/pupil-main/consts/consts';
import KeepPlaying from 'containers/keep-playing/KeepPlaying';
import CardStudentForStudent from 'components/card-student/card-student-for-user/CardStudentForStudent';

const desc = {
  needToDo: 'нужно развить свои ментальные навыки',
  minutesLeft: 50,
  tips: [
    {
      text: 'cконцентрируйтесь и обратите взор внутрь себя, найдите своё место силы',
      id: +new Date().toDateString(),
    },
    {
      text: 'прочитай мысли своего соседа',
      id: +new Date().toDateString(),
    },
    {
      text: 'загляни в будущее',
      id: +new Date().toDateString(),
    },
  ],
};
const OlympiadPage = () => {
  const { user } = appStore;
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <CardStudentForStudent user={user} isMainPage={false} />
        <Homework gameTitle="олимпиада по ментальной силе" description={desc} id={1} />
        <KeepPlaying className={styles.keepPlaying} games={games} />
      </div>
    </div>
  );
};

export default OlympiadPage;
