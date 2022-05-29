import Head from 'next/head';
import {FC, useEffect, useState} from 'react';
import CardStudent from '@components/card-student/CardStudent';
import WeeklyGrowth from '@components/weekly-growth/WeeklyGrowth';
import Homeworks from '@containers/homeworks/Homeworks';
import KeepPlaying from '@containers/keep-playing/KeepPlaying';
import { useAuthContext } from '@contexts/AuthContext';
import { getProfile } from '@utils/Auth';
import styles from './Home.module.scss';
import appStore, {Roles} from "@app/stores/appStore";
import Schedule from "@components/schedule/Schedule";
import {PupilMain} from "@components/pupil-main/PupilMain";

export default function Home(props:any) {
  console.log(props,'props');
  const {role} = appStore
  let part:any
  console.log(role,'role');
    switch (role) {
      case Roles.Teacher:
        part = <Schedule/>
        break
      case Roles.Pupil:
        part = <PupilMain/>
        break
      default:
        part = <>asd</>
    }
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {part}
      </main>
    </div>
  );
}
