import appStore, { Roles } from '@app/stores/appStore';
import Layout from '@components/layout/Layout';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AppContext, AppProps } from 'next/app';
// import { Provider } from 'react-redux';
import '@styles/normalize.scss';
import 'react-calendar/dist/Calendar.css';
import Head from 'next/head';
import authService from '@app/services/AuthService';

console.log(process.env.asd, 'asd');
const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  // console.log(pageProps.role);
  // appStore.setRole(pageProps.role);
  // console.log(pageProps.info);
  // console.log(pageProps.me);
  console.log(appStore.role);
  return (
    // <BrowserRouter>
    <Layout>
      <Head>
        <title>Trizum</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
    // {/*</BrowserRouter>*/}
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  // const { code } = await authService.sms({ phone: '79001001010' });
  // const {
  //   data: { token },
  // } = await authService.login({ phone: '79001001010', smsCode: code });
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
  return {
    pageProps: {
      role: Roles.Teacher,
      // token: jwt,
      // me: resMe,
    },
  };
};

export default App;
