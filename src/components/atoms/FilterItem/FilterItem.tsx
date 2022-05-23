import Image from 'next/image';
import React, { FC } from 'react';
import close from '@svgs/close.svg';
import styles from './FilterItem.module.scss';

type Props = {
  title: string;
};

const FilterItem: FC<Props> = ({ title }) => {
  return (
    <div className={styles.filter}>
      <span>{title}</span>
      <Image src={close} alt={'close'} />
    </div>
  );
};

export default FilterItem;
