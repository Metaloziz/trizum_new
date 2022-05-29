import {GetServerSideProps, InferGetServerSidePropsType, NextComponentType, NextPageContext} from 'next';
import {AppContext, AppProps, AppProps as NextAppProps} from 'next/app';
import {FC, ReactElement, useEffect, useState} from 'react';
// import { Provider } from 'react-redux';
import {AuthGuard} from '@app/common/AuthGuard';
import {UserAuth} from '@app/models/auth/UserAuth';
import {Client} from '@app/models/user/Client';
import {Manager} from '@app/models/user/Manager';
import {store} from '@app/store';
import Guard from '@components/guard/Guard';
import Layout from '@components/layout/Layout';
import PageLoading from '@components/page-loading/PageLoading';
import {AuthKey} from '@constants/Common';
import AuthContext from '@contexts/AuthContext';
import PageContext from '@contexts/PageContext';
import {useSocket} from '@contexts/SocketContext';
import {checkUserAuthenticated} from '@utils/Auth';
import {setCookie} from '@utils/Cookie';
import '@styles/normalize.scss';
import appStore, {Roles} from "@app/stores/appStore";


const App =(props: AppProps)=> {
  const {Component,pageProps}= props
  console.log(pageProps, 'rst');
  appStore.setRole(pageProps.role)
  //
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}

// type AppProps = {
//
//   pageProps: {
//     role:Roles
//   };
//   Component: ReactElement;
// }

App.getInitialProps = async (appContext: AppContext) => {
  //здесь вставить запрос на авторизацию.
  const res = await Promise.resolve().then(res => 'pupil')
  return {pageProps: {
    role:res
    }}
}

export default App;
