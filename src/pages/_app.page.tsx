import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AppContext, AppProps } from 'next/app';
// import { Provider } from 'react-redux';
import appStore, { Roles } from '@app/stores/appStore';
import Layout from '@components/layout/Layout';
import '@styles/normalize.scss';
import 'react-calendar/dist/Calendar.css';

console.log(process.env.asd, 'asd');
const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  appStore.setRole(pageProps.role);
  console.log(pageProps.info);
  console.log(pageProps.me);
  return (
    // <BrowserRouter>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    //{/*</BrowserRouter>*/}
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  //здесь вставить запрос на авторизацию.
  // const auth = await fetch('api/v1/me')
  // const sms = await fetch('api/v1/sms')
  const { data } = await axios.post(
    'https://backschool.sitetopic.ru/api/v1/sms',
    { phone: '79001001010' },
  );
  console.log(data);
  const res2 = await axios.post(
    'https://backschool.sitetopic.ru/api/v1/login',
    { phone: '79001001010', smsCode: data.code },
  );
  console.log(res2.data.data);
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
  const jwt = jwt_decode(res2.data.data.token);
  console.log(jwt.role);
  return {
    pageProps: {
      role: Roles.Student,
      info: res2.data.data,
      // me: resMe,
    },
  };
};

export default App;
