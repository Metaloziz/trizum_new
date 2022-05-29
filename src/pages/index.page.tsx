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
import {StudentMain} from "@components/pupil-main/StudentMain";
import TeacherEducationMain from "@components/teacher-education/TeacherEducationMain";
import TeacherMain from "@components/teacher-main/teacherMain";

export default function Home(props:any) {
  console.log(props,'props'); //{role: 'pupil'}
  const {role} = appStore
  let part:any
  console.log(role,'role');
    switch (role) {
      case Roles.Student:
        part = <StudentMain/>
        break
      case Roles.TeacherEducation:
        part = <TeacherEducationMain/>
        break
      case Roles.Teacher:
        part = <TeacherMain/>
        break
      case Roles.Unauthorized:
      default:
        part = <>Unauthorized</>
    }
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {part}
    </div>
  );
}

