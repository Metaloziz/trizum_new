import Head from 'next/head';
import appStore, { Roles } from '@app/stores/appStore';
import AdminMain from '@components/admin-main/AdminMain';
import FranchiseeAdminMain from '@components/franchisee-admin-main';
import FranchiseeMain from '@components/franchisee-main';
import MethodistMain from '@components/methodist-main';
import { StudentMain } from '@components/pupil-main/StudentMain';
import TeacherEducationMain from '@components/teacher-education/TeacherEducationMain';
import TeacherMain from '@components/teacher-main/teacherMain';
import TutorMain from '@components/tutor-main';
import styles from './Home.module.scss';

export default function Home(props: any) {
  console.log(props, 'props'); //{role: 'pupil'}
  const { role } = appStore;
  let part: any;
  console.log(role, 'role');
  switch (role) {
    case Roles.Student:
      part = <StudentMain />;
      break;
    case Roles.TeacherEducation:
      part = <TeacherEducationMain />;
      break;
    case Roles.Teacher:
      part = <TeacherMain />;
      break;
    case Roles.FranchiseeAdmin:
      part = <FranchiseeAdminMain />;
      break;
    case Roles.Franchisee:
      part = <FranchiseeMain />;
      break;
    case Roles.Methodist:
      part = <MethodistMain />;
      break;
    case Roles.Tutor:
      part = <TutorMain />;
      break;
    case Roles.Admin:
      part = <AdminMain />;
      break;
    case Roles.Unauthorized:
    default:
      part = <>Unauthorized</>;
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
