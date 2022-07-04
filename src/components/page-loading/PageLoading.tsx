import { useEffect, useState, FC } from 'react';

import classNames from 'classnames';

import styles from './PageLoading.module.scss';

import { useRouter } from 'next/router';

const PageLoading: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onLoadStart = () => setIsLoading(true);
  const onLoadEnd = () => setIsLoading(false);

  useEffect(() =>
    // router.events.on(`routeChangeStart`, onLoadStart);
    // router.events.on(`routeChangeComplete`, onLoadEnd);
    // router.events.on(`routeChangeError`, onLoadEnd);

    () => {
      // router.events.off(`routeChangeStart`, onLoadStart);
      // router.events.off(`routeChangeComplete`, onLoadEnd);
      // router.events.off(`routeChangeError`, onLoadEnd);
    },
  );

  return <div className={classNames(styles.overlay, { [styles.show]: isLoading })} />;
};

export default PageLoading;
