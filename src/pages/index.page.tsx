import { useEffect, useState } from 'react';

import appStore, { Roles } from '@app/stores/appStore';
import AdminMain from '@components/admin-main/AdminMain';
import FranchiseeAdminMain from '@components/franchisee-admin-main';
import FranchiseeMain from '@components/franchisee-main';
import MethodistMain from '@components/methodist-main';
import { StudentMain } from '@components/pupil-main/StudentMain';
import TeacherEducationMain from '@components/teacher-education/TeacherEducationMain';
import TeacherMain from '@components/teacher-main/teacherMain';
import TutorMain from '@components/tutor-main';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';

import styles from './Home.module.scss';

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
        setPart(<>Unauthorized</>);
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
