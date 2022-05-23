import React, { FC } from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import CustomSelect from '@components/select/CustomSelect';
import styles from './teacherSearchBar.module.scss';

type TeacherSearchBarProps = {
  groups: string[];
  schools: string[];
  cities: string[];
};

const TeacherSearchBar: FC<TeacherSearchBarProps> = (props) => {
  const { cities, groups, schools } = props;
  const createOptions = (arr: string[]) => {
    return arr.map((el) => ({ value: el, label: el }));
  };
  const groupOptions = createOptions(groups);
  const schoolOptions = createOptions(schools);
  const citiesOptions = createOptions(cities);
  return (
    //TODO: откуда получаем данны по группе, школам, городам? Бэк или хардкод
    <div className={styles.wrapper}>
      <div className={styles.flexWrapper}>
        <InformationItem
          title={'Дата'}
          variant={'calendar'}
          additionalCn={styles.flex}
        />
        <div className={styles.flex}>
          <CustomSelect options={groupOptions} placeholder={'Группа'} />
          <CustomSelect options={schoolOptions} placeholder={'Школа'} />
          <CustomSelect options={citiesOptions} placeholder={'Город'} />
        </div>
        <div className={styles.flex}>
          <InformationItem
            title={'ФИО франчайзи'}
            variant={'input'}
            additionalCn={styles.input}
          />
          <CustomSelect
            options={citiesOptions}
            placeholder={''}
            label={'Юр. адрес'}
            additionalCn={styles.select}
          />
        </div>
      </div>
      <CustomButton size={'small'}>Найти</CustomButton>
    </div>
  );
};

export default TeacherSearchBar;
