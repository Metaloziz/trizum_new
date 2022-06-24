import React, { FC } from 'react';

import CardStudentForTeacher from '@components/card-student/card-student-for-teacher/CardStudentForTeacher';
import CardStudentForUser from '@components/card-student/card-student-for-user/CardStudentForUser';

import CardStudentExtended from './card-student-extended/CardStudentExtended';

type UserType = 'student' | 'teacher' | 'extended';

interface Props {
  title: string;
  type: UserType;
  isFooterDisabled?: boolean;
}

const CardStudent: FC<Props> = ({ title, type, isFooterDisabled }) => (
  <>
    {type === 'student' && <CardStudentForUser title={title} isFooterDisabled={isFooterDisabled} />}
    {type === 'teacher' && <CardStudentForTeacher title={title} flag />}
    {type === 'extended' && <CardStudentExtended title={title} />}
  </>
);
CardStudent.defaultProps = {
  isFooterDisabled: false,
};
export default CardStudent;
