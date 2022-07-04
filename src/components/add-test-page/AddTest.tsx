import { useState } from 'react';

import styles from './AddTest.module.scss';

import { AnswerT } from 'app/types/CourseTypes';
import AddVariantList from 'components/add-test-page/add-variant/addVariantList';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import TextEditor from 'components/text-editor/TextEditor';
import Toggle from 'components/toggle/Toggle';

export type stateVariantType = {
  id: number;
  completed: boolean;
  value: string;
};

const roles = [
  {
    value: 'Роль 1',
    label: 'Роль 1',
  },
  {
    value: 'Роль 2',
    label: 'Роль 2',
  },
  {
    value: 'Роль 3',
    label: 'Роль 3',
  },
];

const IndexPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [variants, setVariants] = useState<Array<AnswerT>>([]);
  const [isTextActive, setTextIsActive] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [answers, setAnswers] = useState<AnswerT[]>([]);
  const addVariant = () => {
    setVariants(value => [...value, { text: '', correct: false }]);
  };

  const handlerVariant = (value: string) => {
    setVariants(vars =>
      vars.map(item => {
        if (item.text === answer) {
          item.text = value;
        }
        return item;
      }),
    );
  };

  const handleToggleChange = (value: boolean) => {
    setTextIsActive(value);
  };

  const handleChecked = (text: string, value: boolean) => {
    setVariants(vars =>
      vars.map(item => (item.text === text ? { ...item, correct: value } : item)),
    );
  };

  const onEditorChange = (state: any) => {};
  const onTitleChange = (str: string) => {
    setTitle(str);
  };
  const onAnswerOptionChange = (str: string) => {
    setAnswer(str);
  };
  const onAddAnswerClick = () => {
    const obj: AnswerT = {
      text: answer,
      correct: isCorrect,
    };
    setAnswers([obj, ...answers]);
    setAnswer('');
    setIsCorrect(false);
  };
  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <div className={styles.wrapContent}>
          <h1>Добавление теста</h1>
          <div className={styles.inputWrap}>
            <InformationItem
              title="Наименование теста"
              variant="input"
              value={title}
              onChange={onTitleChange}
            />
          </div>
          <div className={styles.selectBlock}>
            <InformationItem
              title="Роль: "
              variant="select"
              placeholder="Ваша роль"
              option={roles}
            />
          </div>
          <div className={styles.editorBlock}>
            <h3>Текст вопроса</h3>
            <div className={styles.editorWrapper}>
              <TextEditor onChange={onEditorChange} />
            </div>
          </div>
          <div className={styles.addBlock}>
            <InformationItem
              title="Вариант ответа"
              variant="input"
              value={answer}
              onChange={onAnswerOptionChange}
            />
            <button className={styles.addField} type="button" onClick={onAddAnswerClick}>
              Добавить еще поле
            </button>
            {!isTextActive && (
              <AddVariantList
                items={variants}
                handlerVariant={handlerVariant}
                handleChecked={handleChecked}
              />
            )}
            <div className={styles.addVariant}>
              {!isTextActive && (
                <div>
                  <Button onClick={addVariant}>Добавить вариант</Button>
                </div>
              )}
              <div className={styles.choiceAnswer}>
                <p>Вариативный</p>
                <div className={styles.switchToggle}>
                  <Toggle defaultValue={isTextActive} onChange={handleToggleChange} />
                </div>
                <p>Текстовый</p>
              </div>
            </div>
            {!!answers.length && (
              <ul>
                {answers.map(elem => (
                  <li key={elem.text}>{elem.text}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.btnBlock}>
            <Button>Сохранить</Button>
          </div>
        </div>
      </div>
      <div>
        <BasicModal visibility={showModal} changeVisibility={setShowModal}>
          <div className={styles.modalContainer}>
            <h2>Добавление теста</h2>
            <div className={styles.addNameTest}>
              <p>Наименование теста</p>
              <div className={styles.choiceBlock}>
                <div className={styles.titleInput}>
                  <InformationItem variant="input" size="normal" placeholder="Название" />
                </div>
                <div className={styles.selectBlock}>
                  <InformationItem
                    title="Роль: "
                    variant="select"
                    placeholder="Ваша роль"
                    option={roles}
                  />
                </div>
              </div>
            </div>
            <div className={styles.textQuestion}>
              <p>Текст вопроса</p>
              <TextEditor />
            </div>
            {!isTextActive && (
              <AddVariantList
                items={variants}
                handlerVariant={handlerVariant}
                handleChecked={handleChecked}
              />
            )}
            <div className={styles.addVariant}>
              {!isTextActive && (
                <div>
                  <Button onClick={addVariant}>Добавить вариант</Button>
                </div>
              )}
              <div className={styles.choiceAnswer}>
                <p>Вариативный</p>
                <div className={styles.switchToggle}>
                  <Toggle defaultValue={isTextActive} onChange={handleToggleChange} />
                </div>
                <p>Текстовый</p>
              </div>
            </div>
            <div className={styles.btnSave}>
              <Button>Сохранить</Button>
            </div>
          </div>
        </BasicModal>
      </div>
    </div>
  );
};

export default IndexPage;
