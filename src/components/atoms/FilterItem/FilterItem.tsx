import React, { FC } from 'react';

import styles from './FilterItem.module.scss';

import close from 'assets/svgs/close.svg';
import Image from 'components/image/Image';

type Props = {
  title: string;
};

const FilterItem: FC<Props> = ({ title }) => (
  <div className={styles.filter}>
    <span>{title}</span>
    <Image src={close} alt="close" />
  </div>
);

export default FilterItem;
