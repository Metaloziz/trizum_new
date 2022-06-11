import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import BlogPage from '@components/blog-page/BlogPage';
import Custom404 from '@pages/404.page';

type Props = Record<string, unknown>;

const IndexPage: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.TeacherEducation:
    case Roles.Tutor:
    case Roles.Student:
      //для ученика дизэйбл кнопки тест
      return <BlogPage />;
    case Roles.FranchiseeAdmin:
    default:
      return <Custom404 />;
  }
});

export default IndexPage;
