import { FC, useEffect, useState } from 'react';

import classNames from 'classnames';

import styles from './PageLoading.module.scss';

const PageLoading: FC = () => {
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
