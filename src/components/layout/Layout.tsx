import { FC, ReactNode, useEffect } from 'react';

import DefaultLayout from './default/DefaultLayout';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import { useRouter } from 'next/router';

interface Props {
  children?: ReactNode;
  layout?: FC<{ children: ReactNode }>;
  props: any;
}

const Layout: FC<{ children: any }> = (props: any) => {
  const router = useRouter();
  // console.log(router.route,'query');
  return (
    <>
      {/*    {LayoutComponent ? (
        <LayoutComponent>{props.children}</LayoutComponent>
      ) : ( */}
      <DefaultLayout>{props.children}</DefaultLayout>
      {/* )} */}
    </>
  );
};

export default Layout;
