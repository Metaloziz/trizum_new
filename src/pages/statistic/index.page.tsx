import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import Results from '@components/results/Results';
import Custom404 from '@pages/404.page';
import styles from '@pages/statistic/Statistic.module.scss';

type Props = Record<string, unknown>;

const IndexPage: FC<Props> = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
    case Roles.Methodist:
    case Roles.Student:
      return <Results />;
    case Roles.TeacherEducation:
    case Roles.Tutor:
    default:
      return <Custom404 />;
  }
});

export default IndexPage;
