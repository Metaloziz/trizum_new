import { ChangeEvent, FC, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './TestPage.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import resultIcon from 'assets/svgs/result-icon.svg';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import Stepper from 'components/step/stepper/Stepper';
import { VariantAnswer } from 'pages/testing/variantAnswer/VariantAnswer';
import { FIRST_ARRAY_ITEM } from 'utils/consts/consts';
import { mixElements } from 'utils/mixElements';
import { LocalContentT } from 'utils/returnFirstQuestionData';

const wrongVariantsAnswers: string[] = [
  'wrong variant 1',
  'wrong variant 2',
  'wrong variant 3',
  'wrong variant 4',
  'wrong variant 5',
];

type TestPagePropsT = {
  id: string;
  title: string;
  content: LocalContentT[];
};

const TestPage: FC<TestPagePropsT> = ({ id, title, content }) => {
  const navigate = useNavigate();

  const defaultRadioButtonValue = 'null';

  const [currentRadioValue, setCurrentRadioValue] = useState(defaultRadioButtonValue);
  const [activeStep, setActiveStep] = useState<number>(1);

  const [questionData, setQuestion] = useState(content[FIRST_ARRAY_ITEM]);

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

  const fooo = () => {
    setCurrentRadioValue(defaultRadioButtonValue);
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);

    const newQuestion = content.find(element => element.id === newActiveStep);

    if (newQuestion) {
      setQuestion(newQuestion);
    }
  };

  const onEndTest = () => {
    // todo: добавить реальный id
    navigate(`${AppRoutes.Testing}/result`);
  };
  return (
    <div className={styles.wrapperTesting}>
      <div>
        <h2>{title}</h2>
      </div>
      <div className={styles.choiceWrap}>
        <div className={styles.endTest}>
          <Button onClick={onEndTest}>Закончить тест</Button>
        </div>
        <div className={styles.stepStyle}>
          <Stepper countStep={content.length} activeStepCount={activeStep} />
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
            <Button onClick={fooo}>Ответить</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
