import { FC, ReactNode } from 'react';

import DefaultLayout from './default/DefaultLayout';

interface Props {
  children?: ReactNode;
  layout?: FC<{ children: ReactNode }>;
  props: any;
}

const Layout: FC<{ children: any }> = (props: any) => (
  <>
    {/*    {LayoutComponent ? (
        <LayoutComponent>{props.children}</LayoutComponent>
      ) : ( */}
    <DefaultLayout>{props.children}</DefaultLayout>
    {/* )} */}
  </>
);

export default Layout;
