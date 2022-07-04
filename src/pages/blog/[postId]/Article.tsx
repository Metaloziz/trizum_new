import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore, { Roles } from 'app/stores/appStore';
import PostPage from 'components/post-page';
import Custom404 from 'pages/404.page';

type Props = Record<string, unknown>;

const Article: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.Methodist:
    case Roles.TeacherEducation:
    case Roles.Tutor:
    case Roles.Student:
      return <PostPage />;
    case Roles.FranchiseeAdmin:
    default:
      return <Custom404 />;
  }
});

export default Article;
