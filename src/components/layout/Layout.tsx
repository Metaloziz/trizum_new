import {FC, ReactNode, useEffect} from 'react';
import DefaultLayout from './default/DefaultLayout';
import {useRouter} from "next/router";
import appStore, {Roles} from "@app/stores/appStore";
import {Routes} from "@constants/Routes";
import {GetServerSideProps, NextComponentType} from "next";

interface Props {
  children?: ReactNode;
  layout?: FC<{children:ReactNode}>;
  props:any
}

const Layout: FC<{children:any}> = (props:any) => {
  const router = useRouter()
  // console.log(router.route,'query');
  return (
    <>
  {/*    {LayoutComponent ? (
        <LayoutComponent>{props.children}</LayoutComponent>
      ) : (*/}
        <DefaultLayout>{props.children}</DefaultLayout>
      {/*)}*/}
    </>
  );
};

export default Layout;
