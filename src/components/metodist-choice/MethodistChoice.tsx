import { FC } from 'react';

import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';

import styles from './MethodistChoice.module.scss';

const MethodistChoice: FC = () => (
  <div className={styles.methodistChoice}>
    <div>
      <InformationItem variant='input' title='Название' />
      <div className={styles.calendarBlock}>
        <InformationItem variant='calendar' title='Дата создания' />
      </div>
    </div>
    <div>
      <InformationItem
        className={styles.selectBlock}
        variant='select'
        title='Уровень группы'
        placeholder='Активен'
      />
      <div className={styles.inputWrap}>
        <InformationItem
          className={styles.input}
          variant='input'
          title='Колличество уроков'
          placeholder='От'
        />
        <InformationItem className={styles.input} variant='input' placeholder='До' />
      </div>
    </div>
    <div className={styles.btnWrap}>
      <div className={styles.btnBlock}>
        <CustomButton>Добавить</CustomButton>
      </div>
      <CustomButton>Найти</CustomButton>
    </div>
  </div>
);

export default MethodistChoice;
