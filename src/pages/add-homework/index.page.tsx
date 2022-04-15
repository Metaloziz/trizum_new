import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import {
  games,
  groupLevel,
  pattern,
} from '@components/moks-data/moks-data-addHomeWork';
import Step from '@components/step/Step';
import TextEditor from '@components/text-editor/TextEditor';
import styles from './AddHomework.module.scss';

const IndexPage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <div className={styles.homeWork}>
          <h1>Домашнее задание</h1>
          <div>
            <InformationItem
              title={'Уровень группы*'}
              variant={'select'}
              option={groupLevel}
            />
          </div>
          <div>
            <h3>Описание</h3>
            <TextEditor />
          </div>
        </div>
        <div className={styles.sample}>
          <div className={styles.sampleChoice}>
            <div className={styles.sampleBlock}>
              <InformationItem
                title={'Игра'}
                variant={'select'}
                option={games}
              />
              <InformationItem
                title={'Шаблон'}
                variant={'select'}
                option={pattern}
              />
            </div>
            <div className={styles.sampleBlock}>
              <InformationItem
                title={'Игра'}
                variant={'select'}
                option={games}
              />
              <InformationItem
                title={'Шаблон'}
                variant={'select'}
                option={pattern}
              />
            </div>
          </div>
          <div className={styles.sampleChoice}>
            <div className={styles.sampleBlock}>
              <InformationItem
                title={'Игра'}
                variant={'select'}
                option={games}
              />
              <InformationItem
                title={'Шаблон'}
                variant={'select'}
                option={pattern}
              />
            </div>
            <div className={`${styles.sampleBlock} ${styles.sampleAdd}`}>
              <div>
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeBtn}>
        <CustomButton>Сохранить</CustomButton>
        <div>
          <Step initialPage={1} pageCount={4} />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
