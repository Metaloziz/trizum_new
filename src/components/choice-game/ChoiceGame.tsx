import Image from 'next/image';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import {
  group,
  months,
  template,
  year,
} from '@components/moks-data/moks-data-choice-game';
import Step from '@components/step/Step';
import arrowButton from '@svgs/arrow-btn.svg';
import styles from './ChoiceGame.module.scss';

const ChoiceGame = () => {
  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <span>
          <Image src={arrowButton} width={'15px'} height={'10px'} />
        </span>
        <p>На предыдущую страницу</p>
      </div>
      <div className={styles.wrapperInfo}>
        <InformationItem
          size={'normal'}
          title={''}
          variant={'select'}
          option={template}
          placeholder={'Шаблон'}
        />
        <InformationItem
          size={'normal'}
          title={''}
          variant={'select'}
          option={year}
          placeholder={'Год'}
        />
        <InformationItem
          size={'normal'}
          title={''}
          variant={'select'}
          option={months}
          placeholder={'Месяц'}
        />
        <InformationItem
          size={'normal'}
          title={''}
          variant={'select'}
          option={group}
          placeholder={'Группа'}
        />
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.stepWrapper}>
          <p>Номер урока</p>
          <div>
            <Step count={7} />
          </div>
        </div>
        <div className={styles.wrapperBtn}>
          <CustomButton>Выбрать настройки</CustomButton>
        </div>
      </div>
    </div>
  );
};
export default ChoiceGame;
