import React, { FC } from 'react';
import CardStudentForTeacher from '@components/card-student/card-student-for-teacher/CardStudentForTeacher';
import CardStudentForUser from '@components/card-student/card-student-for-user/CardStudentForUser';

type UserType = 'student' | 'teacher' | 'extended';

interface Props {
  title: string;
  user: UserType;
}

const CardStudent: FC<Props> = ({ title, user }) => {
  return (
    <>
      {user === 'student' && <CardStudentForUser title={title} />}
      {user === 'teacher' && <CardStudentForTeacher title={title} />}
      {user === 'extended' && <CardStudentForTeacher title={title} />}
    </>
  );
};

export default CardStudent;
