import { FC, useEffect, useMemo, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './TestPage.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import articlesStore from 'app/stores/articlesStore';
import testsStore from 'app/stores/testsStore';
import resultIcon from 'assets/svgs/result-icon.svg';
import Button from 'components/button/Button';
import { LoadingIndicator } from 'components/franchising-page/ui/LoadingIndicator';
import Image from 'components/image/Image';
import Stepper from 'components/step/stepper/Stepper';
import { MixedAnswers } from 'components/test-page/MixedAnswers/MixedAnswers';
import { mixElements } from 'utils/mixElements';

const wrongVariantsAnswers: string[] = [
  'wrong variant 1',
  'wrong variant 2',
  'wrong variant 3',
  'wrong variant 4',
  'wrong variant 5',
];

const defaultRadioButtonValue = 'null';

const TestPage: FC = observer(() => {
  const {
    setTests,
    isLoading,
    incrementResult,
    postResult,
    getTitleTest,
    result,
    questions,
    currentQuestion,
    setCurrentQuestion,
  } = testsStore;

  const { articleAPI } = articlesStore;

  useEffect(() => {
    setTests();
  }, []);

  const navigate = useNavigate();

  const [currentRadioValue, setCurrentRadioValue] = useState(defaultRadioButtonValue);

  const [activeStep, setActiveStep] = useState(1);

  const mixedAnswer = useMemo(
    () => mixElements(wrongVariantsAnswers, currentQuestion.answer),
    [activeStep, questions, currentQuestion.answer],
  );

  const onEndTest = () => {
    // todo: добавить реальный id
    navigate(`${AppRoutes.Testing}/result`);
  };

  const checkAnswer = () => {
    if (currentRadioValue === currentQuestion.answer) {
      incrementResult();
    }
  };

  const nextStep = () => {
    checkAnswer();

    setCurrentRadioValue(defaultRadioButtonValue);

    const newActiveStep = activeStep + 1;

    const newQuestion = questions.find(element => element.id === newActiveStep);

    if (newQuestion) {
      setCurrentQuestion(newQuestion);
    } else {
      postResult({ articleId: articleAPI.id, result });
      onEndTest();
    }

    setActiveStep(newActiveStep);
  };

  return (
    <div className={styles.wrapperTesting}>
      <LoadingIndicator isLoading={isLoading} />
      <div>
        <h2>{getTitleTest}</h2>
      </div>
      <div className={styles.choiceWrap}>
        <div className={styles.endTest}>
          <Button onClick={onEndTest}>Закончить тест</Button>
        </div>
        <div className={styles.stepStyle}>
          <Stepper countStep={questions.length} activeStepCount={activeStep} />
        </div>
      </div>
      <div className={styles.question}>
        <div className={styles.resultImg}>
          <Image src={resultIcon} width="406px" height="426px" alt="Images" />
        </div>
        <div className={styles.textQuestion}>
          <h3> Вопрос {currentQuestion.id}</h3>
          <p>{currentQuestion.question}</p>
          <div className={styles.answerChoice}>
            <MixedAnswers
              mixedAnswer={mixedAnswer}
              setCurrentRadioValue={setCurrentRadioValue}
              currentRadioValue={currentRadioValue}
            />
          </div>
          <div>
            <Button onClick={nextStep}>Ответить</Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TestPage;
