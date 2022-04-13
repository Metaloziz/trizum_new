import React from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import CustomSelect from '@components/select/CustomSelect';
import styles from './SearchByGroup.module.scss';

const SearchByGroup = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.selectGroup}>
        <div>
          <CustomSelect
            options={[{ label: '1', value: '2' }]}
            placeholder={'Год'}
          />
        </div>
        <div>
          <CustomSelect
            options={[{ label: '1', value: '2' }]}
            placeholder={'Месяц'}
          />
        </div>
        <div>
          <CustomSelect
            options={[{ label: '1', value: '2' }]}
            placeholder={'Группа'}
          />
        </div>
      </div>
      <CustomButton>Найти</CustomButton>
    </div>
  );
};

export default SearchByGroup;
