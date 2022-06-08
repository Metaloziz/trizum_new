import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import Custom404 from '@pages/404.page';

type Props = Record<string, unknown>;

const IndexPage: FC<Props> = () => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.FranchiseeAdmin:
    case Roles.Franchisee:
    case Roles.Admin:
    case Roles.Methodist:
    case Roles.Tutor:
      return <div>user info</div>;
    case Roles.Student:
    case Roles.TeacherEducation:
    default:
      return <Custom404 />;
  }
};

export default IndexPage;
