import { FC } from 'react';

import styles from './NothingFound.module.scss';

import nothingFound from 'assets/svgs/nothing-found.svg';
import Image from 'components/image/Image';

const NothingFound: FC = () => (
  <div className={styles.containerNothing}>
    <h2>По Вашему запросу ничего не найдено</h2>
    <p>Попробуйте изменить фильтр</p>
    <Image src={nothingFound} width={510} height={275} alt="nothing found" />
  </div>
);

export default NothingFound;
