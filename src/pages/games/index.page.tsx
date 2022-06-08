import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import Custom404 from '@pages/404.page';

type Props = Record<string, unknown>;

const IndexPage: FC<Props> = () => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
    case Roles.Methodist:
    case Roles.Student:
      return <div>Games list(not done yet)</div>;
    case Roles.TeacherEducation:
    case Roles.Tutor:
    default:
      return <Custom404 />;
  }
};

export default IndexPage;
