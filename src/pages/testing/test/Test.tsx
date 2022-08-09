import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore, { Roles } from 'app/stores/appStore';
import Custom404 from 'pages/404.page';
import { CurrentTest } from 'pages/testing/CurrentTest/CurrentTest';

const Test: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.TeacherEducation:
      return <CurrentTest />;
    default:
      return <Custom404 />;
  }
});
export default Test;
