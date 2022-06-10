import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import teacherEducationStore from '@app/stores/TeacherEducationStore';
import TestPage from '@components/test-page';
import Custom404 from '@pages/404.page';

const Test: FC = () => {
  const { test } = teacherEducationStore;
  //TODO: проверка если теста нет, то запрос за ним
  console.log(test);
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.TeacherEducation:
      return <TestPage />;
    case Roles.Student:
    case Roles.FranchiseeAdmin:
    case Roles.Tutor:
    default:
      return <Custom404 />;
  }
};

export default Test;
