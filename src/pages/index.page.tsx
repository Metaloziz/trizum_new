import Head from 'next/head';
import { useEffect } from 'react';
import CardStudent from '@components/card-student/CardStudent';
import WeeklyGrowth from '@components/weekly-growth/WeeklyGrowth';
import Homeworks from '@containers/homeworks/Homeworks';
import KeepPlaying from '@containers/keep-playing/KeepPlaying';
import { useAuthContext } from '@contexts/AuthContext';
import { getProfile } from '@utils/Auth';
import styles from './Home.module.scss';

export default function Home() {
  const { auth } = useAuthContext();

  useEffect(() => {
    // Test
    async function test() {
      let profile;
      if (auth) {
        profile = await getProfile(auth.token, auth.roleId);
      }
      console.log('test', profile);
    }

    test();
  }, [auth]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CardStudent
          className={styles.cardStudent}
          isExtended={false}
          user="student"
          title="Днепровский Александр Алексеевич"
        />
        <WeeklyGrowth
          className={styles.weeklyGrowth}
          weeklyGrowth={[
            {
              skillTitle: 'Логика',
              color: 'red',
              id: +new Date().toDateString(),
              percents: 95,
            },
            {
              skillTitle: 'Внимание',
              color: 'violet',
              id: +new Date().toDateString(),
              percents: 76,
            },
            {
              skillTitle: 'Мышление',
              color: 'aquamarine',
              id: +new Date().toDateString(),
              percents: 92,
            },
            {
              skillTitle: 'Концентрация',
              color: 'yellow',
              id: +new Date().toDateString(),
              percents: 86,
            },
          ]}
        />
        <Homeworks
          className={styles.homeworks}
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
        <KeepPlaying
          className={styles.keepPlaying}
          games={[
            {
              title: 'Память и ритм',
              minutesLeft: 18,
              colorTheme: 'blue',
              id: +new Date().toDateString(),
            },
            {
              title: 'Найди слова/числа/фигуры',
              minutesLeft: 36,
              colorTheme: 'gradient-violet',
              id: +new Date().toDateString(),
            },
            {
              title: 'Мухи в кубе',
              minutesLeft: 44,
              colorTheme: 'gradient-blue-darker',
              id: +new Date().toDateString(),
            },
            {
              title: 'Антипазл',
              minutesLeft: 31,
              colorTheme: 'aquamarine',
              id: +new Date().toDateString(),
            },
          ]}
        />
      </main>
    </div>
  );
}
