import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore, { Roles } from 'app/stores/appStore';
import teacherEducationStore from 'app/stores/TeacherEducationStore';
import TestPage from 'components/test-page';
import Custom404 from 'pages/404.page';

const Test: FC = observer(() => {
  const { test } = teacherEducationStore;
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.TeacherEducation:
      return <TestPage />;
    default:
      return <Custom404 />;
  }
});

export default Test;
