import appStore, { Roles } from '@app/stores/appStore';
import Layout from '@components/layout/Layout';
import { AppContext, AppProps } from 'next/app';
// import { Provider } from 'react-redux';
import '@styles/normalize.scss';
import 'react-calendar/dist/Calendar.css';
import Head from 'next/head';

import { useEffect, useState } from 'react';

import tokenService from '@app/services/tokenService';
import authService from '@app/services/authService';

console.log(process.env.asd, 'asd');
const App = (props: AppProps<{ token: string }>) => {
  const { Component, pageProps } = props;
  console.log(pageProps.token, 'token');
  const [isLoaded, setIsLoaded] = useState(false);
  const asd = async () => {
    const token = await tokenService.getUser();
    if (token.length) {
      try {
        const res = await authService.loadme();
        console.log(res.role);
        appStore.setRole(res.role as Roles);
      } catch (e) {
        console.log((e as Error).message);
      }
    }
    setIsLoaded(true);
  };
  useEffect(() => {
    asd();
  }, []);
  return (
    // <BrowserRouter>
    <Layout>
      <Head>
        <title>Trizum</title>
      </Head>
      {!isLoaded ? <>Loading...</> : <Component {...pageProps} />}
    </Layout>
    // {/*</BrowserRouter>*/}
  );
};

App.getInitialProps = async (appContext: AppContext) =>
  // const { code } = await authService.sms({ phone: '79001001010' });
  // const {
  //   data: { token },
  // } =
  // const jwt = jwtDecode(token);
  // const user = await authService.loadme()
  // здесь вставить запрос на авторизацию.
  // const auth = await fetch('api/v1/me')
  // const sms = await fetch('api/v1/sms')
  // const { data } = await axios.post(
  //   'https://backschool.sitetopic.ru/api/v1/sms',
  //   { phone: '79001001010' },
  // );
  // console.log(data);
  // const res2 = await axios.post(
  //   'https://backschool.sitetopic.ru/api/v1/login',
  //   { phone: '79001001010', smsCode: data.code },
  // );
  // console.log(res2.data.data);
  // const resMe = await axios.post(
  //   'https://backschool.sitetopic.ru/api/v1/me',
  //   {},
  //   {
  //     headers: {
  //       Authorization: res2.data.data.token,
  //     },
  //   },
  // );
  // console.log(resMe.data);
  // const jwt = jwt_decode(res2.data.data.token);
  // console.log(jwt.role);
  ({
    pageProps: {
      token: '',
    },
  });

export default App;
