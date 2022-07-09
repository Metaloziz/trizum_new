import React, { FC } from 'react';

import styles from './teacherSearchBar.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import CustomSelect from 'components/select/CustomSelect';
import { getOption } from 'utils/getOption';

type TeacherSearchBarProps = {
  groups: string[];
  schools: string[];
  cities: string[];
};

const TeacherSearchBar: FC<TeacherSearchBarProps> = props => {
  const { cities, groups, schools } = props;

  const groupOptions = groups.map(el => getOption(el, el));
  const schoolOptions = schools.map(el => getOption(el, el));
  const citiesOptions = cities.map(el => getOption(el, el));
  return (
    // TODO: откуда получаем данны по группе, школам, городам? Бэк или хардкод
    <div className={styles.wrapper}>
      <div className={styles.flexWrapper}>
        <InformationItem title="Дата" variant="calendar" className={styles.dateSelect} />
        <CustomSelect options={groupOptions} placeholder="Группа" className={styles.groupSelect} />
        {/* <div className={styles.flex}> */}

        {/* <CustomSelect options={schoolOptions} placeholder={'Школа'} />
          <CustomSelect options={citiesOptions} placeholder={'Город'} /> */}
        {/* </div> */}
        {/* <div className={styles.flex}>
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
        </div> */}
      </div>
      <Button size="small">Найти</Button>
    </div>
  );
};

export default TeacherSearchBar;
