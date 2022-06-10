import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import teacherEducationStore from '@app/stores/TeacherEducationStore';
import TestResultPage from '@components/test-result-page/TestResultPage';
import Custom404 from '@pages/404.page';

const Theory: FC = () => {
  const { test } = teacherEducationStore;
  //TODO: проверка если теста нет, то запрос за ним
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.TeacherEducation:
      return <TestResultPage />;
    case Roles.Student:
    case Roles.FranchiseeAdmin:
    case Roles.Tutor:
    default:
      return <Custom404 />;
  }
};

export default Theory;
