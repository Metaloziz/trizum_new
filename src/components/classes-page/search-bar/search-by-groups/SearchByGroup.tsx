import React from 'react';

import styles from './SearchByGroup.module.scss';

import Button from 'components/button/Button';
import CustomSelect from 'components/select/CustomSelect';

const SearchByGroup = () => (
  <div className={styles.wrapper}>
    <div className={styles.selectGroup}>
      <div>
        <CustomSelect options={[{ label: '1', value: '2' }]} placeholder="Год" />
      </div>
      <div>
        <CustomSelect options={[{ label: '1', value: '2' }]} placeholder="Месяц" />
      </div>
      <div>
        <CustomSelect options={[{ label: '1', value: '2' }]} placeholder="Группа" />
      </div>
    </div>
    <Button size="small">Найти</Button>
  </div>
);

export default SearchByGroup;
