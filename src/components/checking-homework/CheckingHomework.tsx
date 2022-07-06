import React from 'react';

import styles from './CheckingHomework.module.scss';

import CardStudent from 'components/card-student/CardStudent';
import ChoiceInfoList from 'components/checking-homework/choice-info/choice-info-list/ChoiceInfoList';
import Homeworks from 'containers/homeworks/Homeworks';

const CheckingHomework = () => {
  const a = '';
  return (
    <div className={styles.mainContainer}>
      <div className={styles.firstContainer}>
        {/* <CardStudent title="Днепровский Александр Алексеевич" type="student" /> */}
        <Homeworks
          className={styles.homeworksChecking}
          homeworks={[
            {
              gameTitle: 'Память и ритм',
              id: +new Date().toDateString(),
              description: {
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
              },
            },
            {
              gameTitle: 'Память и ритм',
              id: +new Date().toDateString(),
              description: {
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
              },
            },
          ]}
        />
      </div>
      <div>
        <ChoiceInfoList
          className={styles.keepPlaying}
          games={[
            {
              title: 'Общая стаститика',
              minutesLeft: 18,
              colorTheme: 'blue',
              id: +new Date().toDateString(),
            },
            {
              title: 'Филателист',
              minutesLeft: 36,
              colorTheme: 'gradient-violet',
              id: +new Date().toDateString(),
            },
            {
              title: 'Паро-вик',
              minutesLeft: 44,
              colorTheme: 'gradient-blue-darker',
              id: +new Date().toDateString(),
            },
            {
              title: 'Сдвиг по вертикали',
              minutesLeft: 31,
              colorTheme: 'aquamarine',
              id: +new Date().toDateString(),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CheckingHomework;
