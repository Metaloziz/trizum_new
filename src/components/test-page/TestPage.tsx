import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';

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
import { VariantAnswer } from 'pages/testing/variantAnswer/VariantAnswer';
import { addIdElements } from 'utils/addIdElements';
import { FIRST_ARRAY_ITEM } from 'utils/consts/consts';
import { mixElements } from 'utils/mixElements';

const wrongVariantsAnswers: string[] = [
  'wrong variant 1',
  'wrong variant 2',
  'wrong variant 3',
  'wrong variant 4',
  'wrong variant 5',
];

const TestPage: FC = observer(() => {
  const {
    getTests,
    currentTest: {
      test: { content, title },
    },
    isLoading,
    incrementResult,
    postResult,
    result,
    resetResult,
  } = testsStore;

  const { articleAPI } = articlesStore;

  useEffect(() => {
    getTests();
  }, []);

  const defaultRadioButtonValue = 'null';

  const navigate = useNavigate();

  const [currentRadioValue, setCurrentRadioValue] = useState(defaultRadioButtonValue);

  const [activeStep, setActiveStep] = useState<string>('1');

  const questions = useMemo(() => addIdElements(content), []);

  const [questionData, setQuestion] = useState(questions[FIRST_ARRAY_ITEM]);

  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
  };

  const mixedAnswer = useMemo(
    () => mixElements(wrongVariantsAnswers, questionData.answer),
    [activeStep],
  );

  const mixedAnswerTags = mixedAnswer.map(variant => (
    <VariantAnswer
      key={variant}
      onChange={handlerRadioChange}
      currentRadioValue={currentRadioValue}
      value={variant}
    />
  ));

  const onEndTest = () => {
    // todo: добавить реальный id
    navigate(`${AppRoutes.Testing}/result`);
  };

  const checkAnswer = () => {
    if (currentRadioValue === questionData.answer) {
      incrementResult();
    }
  };

  const nextStep = () => {
    checkAnswer();

    setCurrentRadioValue(defaultRadioButtonValue);
    const newActiveStep = (activeStep + 1).toString();
    setActiveStep(newActiveStep);

    const newQuestion = questions.find(element => element.id === newActiveStep);

    if (newQuestion) {
      setQuestion(newQuestion);
    } else {
      postResult({ articleId: articleAPI.id, result: result.toString() });
      onEndTest();
      resetResult();
    }
  };

  return (
    <div className={styles.wrapperTesting}>
      <LoadingIndicator isLoading={isLoading} />
      <div>
        <h2>{title}</h2>
      </div>
      <div className={styles.choiceWrap}>
        <div className={styles.endTest}>
          <Button onClick={onEndTest}>Закончить тест</Button>
        </div>
        <div className={styles.stepStyle}>
          <Stepper countStep={questions.length} activeStepCount={Number(activeStep)} />
        </div>
      </div>
      <div className={styles.question}>
        <div className={styles.resultImg}>
          <Image src={resultIcon} width="406px" height="426px" alt="Images" />
        </div>
        <div className={styles.textQuestion}>
          <h3> Вопрос {questionData.id}</h3>
          <p>{questionData.question}</p>
          <div className={styles.answerChoice}>
            <div>{mixedAnswerTags}</div>
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
