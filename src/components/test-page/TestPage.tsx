import { ChangeEvent, useState } from 'react';

import CustomButton from '@components/custom-button/CustomButton';
import Step from '@components/step/Step';
import { Routes } from '@constants/Routes';
import resultIcon from '@svgs/result-icon.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from './TestPage.module.scss';

const TestPage = () => {
  const [currentRadioValue, setCurrentRadioValue] = useState('inputChoice1');
  const router = useRouter();
  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
  };
  const onEndTest = () => {
    router.push(`${Routes.Testing}/result/${router.query.id}`);
  };
  return (
    <div className={styles.wrapperTesting}>
      <div>
        <h2>Второй блок</h2>
      </div>
      <div className={styles.choiceWrap}>
        <div className={styles.endTest}>
          <CustomButton onClick={onEndTest}>Закончить тест</CustomButton>
        </div>
        <div className={styles.stepStyle}>
          <Step countStep={30} isRenderButtons />
        </div>
      </div>
      <div className={styles.question}>
        <div className={styles.resultImg}>
          <Image src={resultIcon} width="406px" height="426px" alt="Images" />
        </div>
        <div className={styles.textQuestion}>
          <h3>Вопрос 18</h3>
          <p>
            А также явные признаки победы институционализации призывают нас к новым свершениям,
            которые, в свою очередь, должны быть обнародованы. Противоположная точка зрения
            подразумевает, что интерактивные прототипы призывают нас к новым свершениям, которые, в
            свою очередь, должны быть призваны к ответу. Сложно сказать, почему сторонники
            тоталитаризма в науке являются только методом политического участия и в равной степени
            предоставлены сами себе.
          </p>
          <div className={styles.answerChoice}>
            <div>
              <div className={styles.inputChoice}>
                <input
                  type="radio"
                  value="inputChoice1"
                  id="inputChoice1"
                  name="currentRadioValue"
                  onChange={handlerRadioChange}
                  checked={currentRadioValue === 'inputChoice1'}
                />
                <label htmlFor="inputChoice1">Вариант ответа 1</label>
              </div>
              <div className={styles.inputChoice}>
                <input
                  type="radio"
                  value="inputChoice2"
                  id="inputChoice2"
                  name="currentRadioValue"
                  onChange={handlerRadioChange}
                  checked={currentRadioValue === 'inputChoice2'}
                />
                <label htmlFor="inputChoice2">Вариант ответа 2</label>
              </div>
              <div className={styles.inputChoice}>
                <input
                  type="radio"
                  value="inputChoice3"
                  id="inputChoice3"
                  name="currentRadioValue"
                  onChange={handlerRadioChange}
                  checked={currentRadioValue === 'inputChoice3'}
                />
                <label htmlFor="inputChoice3">Вариант ответа 3</label>
              </div>
            </div>
            <div>
              <div className={styles.inputChoice}>
                <input
                  type="radio"
                  value="inputChoice4"
                  id="inputChoice4"
                  name="currentRadioValue"
                  onChange={handlerRadioChange}
                  checked={currentRadioValue === 'inputChoice4'}
                />
                <label htmlFor="inputChoice4">Вариант ответа 4</label>
              </div>
              <div className={styles.inputChoice}>
                <input
                  type="radio"
                  value="inputChoice5"
                  id="inputChoice5"
                  name="currentRadioValue"
                  onChange={handlerRadioChange}
                  checked={currentRadioValue === 'inputChoice5'}
                />
                <label htmlFor="inputChoice5">Вариант ответа 5</label>
              </div>
              <div className={styles.inputChoice}>
                <input
                  type="radio"
                  value="inputChoice6"
                  id="inputChoice6"
                  name="currentRadioValue"
                  onChange={handlerRadioChange}
                  checked={currentRadioValue === 'inputChoice6'}
                />
                <label htmlFor="inputChoice6">Вариант ответа 6</label>
              </div>
            </div>
          </div>
          <div>
            <CustomButton>Ответить</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
