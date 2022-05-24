import Image from 'next/image';
import { FC } from 'react';
import resultPic from '@public/result-pic.jpg';
import exclude from '@svgs/exclude.svg';
import styles from './TeacherItemResult.module.scss';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TeacherMainItemProps {}

const IndexPage: FC<TeacherMainItemProps> = ({}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerItem}>
        <div>
          <h1>Второй блок</h1>
        </div>
        <div className={styles.itemBlock}>
          <div className={styles.itemPic}>
            <Image
              src={resultPic}
              width={'300px'}
              height={'300px'}
              alt="Images"
            />
          </div>
          <div className={styles.itemText}>
            <h2>Результат тестирования</h2>
            <div className={styles.resultBlock}>
              <div className={styles.attempt}>
                <p>Попыток:</p>
                <span>8 из 10</span>
              </div>
              <div className={styles.resultInfo}>
                <p>Ваш результат:</p>
                <span>20 проваленных из 30</span>
              </div>
            </div>
            <div className={styles.recommendations}>
              <div className={styles.reqPic}>
                <Image
                  src={exclude}
                  width={'34px'}
                  height={'34px'}
                  alt="Exclude"
                />
              </div>
              <p>Рекомендуем повторить теорию и опробовать еще раз</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
