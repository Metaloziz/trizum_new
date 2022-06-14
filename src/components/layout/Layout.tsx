import { FC, ReactNode, useEffect } from 'react';

import appStore, { Roles } from '@app/stores/appStore';
import { Routes } from '@constants/Routes';
import { GetServerSideProps, NextComponentType } from 'next';
import { useRouter } from 'next/router';

import DefaultLayout from './default/DefaultLayout';

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
