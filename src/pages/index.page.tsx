import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAuthContext } from '@contexts/AuthContext';
import { getProfile } from '@utils/Auth';
import styles from './Home.module.scss';

export default function Home() {
  const { auth } = useAuthContext();

  useEffect(() => {
    // Test
    async function test() {
      let profile;
      if (auth) {
        profile = await getProfile(auth.token, auth.roleId);
      }
      console.log('test', profile);
    }

    test();
  }, [auth]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>

        <p>
          <Link href='/about'>
            <a>About Us</a>
          </Link>
        </p>
        <p>
          <Link href='/protected'>
            <a>Protected Page</a>
          </Link>
        </p>
      </main>
    </div>
  );
}
