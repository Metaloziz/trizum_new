import React, { FC } from 'react';

import {EmptyUser, Roles} from 'app/stores/appStore';
import { ResponseLoadMeBaseT } from 'app/types/ResponseLoadMeBaseT';
import CardStudentForTeacher from 'components/card-student/card-student-for-teacher/CardStudentForTeacher';
import CardStudentForStudent from 'components/card-student/card-student-for-user/CardStudentForStudent';

interface Props {
  user: EmptyUser;
}

const CardStudent: FC<Props> = props => {
  const { user } = props;

  return (
    <>
      {user.role === Roles.Student && <CardStudentForStudent user={user} />}
      {user.role === Roles.Teacher && <CardStudentForTeacher user={user} />}
      {/* {type === 'extended' && <CardStudentExtended title={title} />} */}
    </>
  );
};

export default CardStudent;
