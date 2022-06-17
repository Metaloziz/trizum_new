import { FC } from 'react';

import nothingFound from '@svgs/nothing-found.svg';
import Image from 'next/image';

import styles from './NothingFound.module.scss';

const NothingFound: FC = () => (
  <div className={styles.containerNothing}>
    <h2>По Вашему запросу ничего не найдено</h2>
    <p>Попробуйте изменить фильтр</p>
    <Image src={nothingFound} width={510} height={275} alt='nothing found' />
  </div>
);

export default NothingFound;
