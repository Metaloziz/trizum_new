import React, { FC } from 'react';
import RecognitionResults from '@components/recognition-results/RecognitionResults';
import styles from 'src/pages/recognition/Recognition.module.scss';

type Props = Record<string, unknown>;

const IndexPage: FC<Props> = () => {
  return (
    <div className={styles.container}>
      <RecognitionResults />
    </div>
  );
};

export default IndexPage;
