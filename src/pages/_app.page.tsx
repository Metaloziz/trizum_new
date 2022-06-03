import {AppContext, AppProps} from 'next/app';
// import { Provider } from 'react-redux';
import Layout from '@components/layout/Layout';
import '@styles/normalize.scss';
import appStore, {Roles} from "@app/stores/appStore";

console.log(process.env.asd,'asd');
const App = (props: AppProps) => {
  const {Component, pageProps} = props

  appStore.setRole(pageProps.role)
  return (
    // <BrowserRouter>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    //{/*</BrowserRouter>*/}
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  //здесь вставить запрос на авторизацию.
  // const auth = await fetch('api/v1/me')
  // const sms = await fetch('api/v1/sms')
  // const code = await fetch('api/v1/login')
  const res = await Promise.resolve().then(res => Roles.Admin)
  return {
    pageProps: {
      role: res
    }
  }
}

export default App;
