import { FC, useEffect, useMemo } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import Header from '../../header/Header';

import styles from './DefaultLayout.module.scss';

import appStore, { Roles } from 'app/stores/appStore';
import RoleButtons from 'components/role-buttons/RoleButtons';
import Sidebar from 'components/sidebar/Sidebar';

type Props = Record<string, any>;

const DefaultLayout: FC<Props> = observer(({ children, ...rest }) => {
  const { isLoggedIn, isInitialized } = appStore;
  const func = async () => {
    await appStore.loadme();
  };
  useEffect(() => {
    func();
  }, []);
  return !isInitialized ? (
    <>Initialising...</>
  ) : (
    <div className={cn(styles.layout, !isLoggedIn && styles.layout_unauth)}>
      <Header className={styles.header} />
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
});

export default DefaultLayout;
