import { FC } from 'react';

// import CoursesPage from 'components/page-courses/CoursesPage';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';

const Courses: FC = observer(() => {
  switch (appStore.role) {
    case Roles.Methodist:
      return <>smile :)</>;
    // return <CoursesPage />;
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default Courses;
