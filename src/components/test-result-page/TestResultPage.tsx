import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import resultPic from '../../assets/images/result-pic.jpg';

import styles from './TestResultPage.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import testsStore from 'app/stores/testsStore';
import exclude from 'assets/svgs/exclude.svg';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import { ResultMessage } from 'components/test-result-page/ResultMessage/ResultMessage';

const TestResultPage: FC = observer(() => {
  const navigate = useNavigate();

  const { result, currentTest, resetResult } = testsStore;

  useEffect(() => () => resetResult(), []);

  const onEndTest = () => {
    navigate(AppRoutes.Blog);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerItem}>
        <div>
          <h1>{currentTest.test.title}</h1>
        </div>
        <div className={styles.itemBlock}>
          <div className={styles.itemPic}>
            <Image src={resultPic} width="300px" height="300px" alt="Images" />
          </div>
          <div className={styles.itemText}>
            <h2>Результат тестирования</h2>
            <div className={styles.resultBlock}>
              {/* <div className={styles.attempt}> */}
              {/*  <p>Попыток:</p> */}
              {/*  <span>8 из 10</span> */}
              {/* </div> */}
              <div className={styles.resultInfo}>
                {/* <p>Ваш результат:</p> */}
                <ResultMessage result={result} currentTest={currentTest} />
              </div>
            </div>
            <div className={styles.recommendations}>
              <div className={styles.reqPic}>
                <Image src={exclude} width="34px" height="34px" alt="Exclude" />
              </div>
              <p>Рекомендуем повторить теорию и опробовать еще раз</p>
            </div>
            <Button onClick={onEndTest}>К теории</Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TestResultPage;
