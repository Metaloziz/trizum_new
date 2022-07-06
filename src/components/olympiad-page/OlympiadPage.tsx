import React from 'react';

import styles from './OlympiadPage.module.scss';

import CardStudent from 'components/card-student/CardStudent';
import Homework from 'components/homework/Homework';

const desc = {
  needToDo: '',
  minutesLeft: 10,
  tips: [
    {
      text: '1',
      id: +new Date().toDateString(),
    },
    {
      text: '2',
      id: +new Date().toDateString(),
    },
    {
      text: '3',
      id: +new Date().toDateString(),
    },
  ],
};
const OlympiadPage = () => (
  <div className={styles.container}>
    <div className={styles.row}>
      <div>{/* <CardStudent title="Днепровский Александр Алексеевич" type="student" /> */}</div>
      <Homework gameTitle="asd" description={desc} id={1} />
    </div>
  </div>
);

export default OlympiadPage;
