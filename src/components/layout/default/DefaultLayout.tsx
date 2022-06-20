import { FC } from 'react';

import appStore, { Roles } from '@app/stores/appStore';
import RoleButtons from '@components/role-buttons/RoleButtons';
import Sidebar from '@components/sidebar/Sidebar';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import Header from '../../header/Header';

import styles from './DefaultLayout.module.scss';

type Props = Record<string, any>;

const DefaultLayout: FC<Props> = observer(({ children, ...rest }) => {
  const { role } = appStore;
  return (
    <div className={cn(styles.layout, role === Roles.Unauthorized && styles.layout_unauth)}>
      <Header className={styles.header} />
      <Sidebar />
      <div className={styles.content}>{children}</div>
      {/* <RoleButtons /> */}
    </div>
  );
});

export default DefaultLayout;
