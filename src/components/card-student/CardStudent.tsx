import React, { FC } from 'react';

import CardStudentForTeacher from '@components/card-student/card-student-for-teacher/CardStudentForTeacher';
import CardStudentForStudent from '@components/card-student/card-student-for-user/CardStudentForStudent';

import CardStudentExtended from './card-student-extended/CardStudentExtended';

type UserType = 'student' | 'teacher' | 'extended';

interface Props {
  title: string;
  type: UserType;
}

const mockStudent = {
  fullName: 'string',
  role: 'string',
  city: 'string',
  phone: 'string',
  birthdate: 'string',
  email: 'string',
};

const CardStudent: FC<Props> = ({ title, type }) => (
  <>
    {type === 'student' && <CardStudentForStudent user={mockStudent} />}
    {type === 'teacher' && <CardStudentForTeacher title={title} flag />}
    {/* {type === 'extended' && <CardStudentExtended title={title} />} */}
  </>
);

export default CardStudent;
