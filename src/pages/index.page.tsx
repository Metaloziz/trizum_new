import { useEffect, useState } from 'react';

import authService from '@app/services/authService';
import appStore, { Roles } from '@app/stores/appStore';
import AdminMain from '@components/admin-main/AdminMain';
import FranchiseeAdminMain from '@components/franchisee-admin-main';
import FranchiseeMain from '@components/franchisee-main';
import MethodistMain from '@components/methodist-main';
import { StudentMain } from '@components/pupil-main/StudentMain';
import TeacherEducationMain from '@components/teacher-education/TeacherEducationMain';
import TeacherMain from '@components/teacher-main/teacherMain';
import TimePicker from '@components/time-picker';
import TutorMain from '@components/tutor-main';
import { AxiosError } from 'axios';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';

import styles from './Home.module.scss';

const t =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTUzOTY2OTEsInNlc3Npb24iOiIxZWNlZDkwZC05MzQzLTZjMWMtODJjNC0yNWQ2MWM5N2ExZDUiLCJyb2xlIjoiYWRtaW4ifQ.Ao5-fSW4zFVmuDtQPDSdqba9i_SuttpNkkxwosJqa666vBBJ38KfwBU7R9dhXhYIaihKh9d-a21Yo8kTcuvy7aB5ltv8AxmlSMr6mkhayDrtkCGwLbic8-YYnwybbp3sG8QtI8ANWJNqUXAdlrvpE-QUKDkNaGeXR0j8Ow7OmtR6aFGEb2OlW8tpfEofx2tB3AarHEh7z6yFC-r9Jt1Lno5c2a_1Q1I32A5-Wdb5kJO2S234N-8rNv7rR1SYS0tSQpBa4JiH4lwn20Pr_bXfd9Cdc2S2fzSH_4cZfmDplXMIzbq1DAAPop57aq4cPdVaNWKNqSQbVbn9QigSBpvUfw';
const Asd = () => {
  const onClick = async () => {
    try {
      await localStorage.setItem('user_secret', JSON.stringify(t));
      // const res = await authService.me();
      // const res = await authService.sms({ phone: '79001001010' });
      const res = await fetch('https://backschool.sitetopic.ru/api/v1/me', {
        headers: {
          Authorization: t,
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
    } catch (e) {
      console.dir(e as AxiosError);
    }
  };
  return (
    <div>
      <button style={{ background: '#fff', padding: 10 }} onClick={onClick}>
        asd
      </button>
      <TimePicker date={new Date()} />
    </div>
  );
};

const Home = observer((props: any) => {
  const { role } = appStore;
  const [part, setPart] = useState(<>Unauthorized</>);
  useEffect(() => {
    switch (role) {
      case Roles.Student:
        setPart(<StudentMain />);
        break;
      case Roles.TeacherEducation:
        setPart(<TeacherEducationMain />);
        break;
      case Roles.Teacher:
        setPart(<TeacherMain />);
        break;
      case Roles.FranchiseeAdmin:
        setPart(<FranchiseeAdminMain />);
        break;
      case Roles.Franchisee:
        setPart(<FranchiseeMain />);
        break;
      case Roles.Methodist:
        setPart(<MethodistMain />);
        break;
      case Roles.Tutor:
        setPart(<TutorMain />);
        break;
      case Roles.Admin:
        setPart(<AdminMain />);
        break;
      case Roles.Unauthorized:
      default:
        setPart(<Asd />);
    }
  }, [role]);

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
});
export default Home;
