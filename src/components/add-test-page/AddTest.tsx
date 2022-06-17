import { useState } from 'react';

import AddVariantList from '@components/add-test-page/add-variant/addVariantList';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import TextEditor from '@components/text-editor/TextEditor';
import Toggle from '@components/toggle/Toggle';

import styles from './AddTest.module.scss';

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
  const [variant, setVariant] = useState<Array<stateVariantType>>([]);
  const [isTextActive, setTextIsActive] = useState<boolean>(true);

  const addVariant = () => {
    setVariant(value => [...value, { id: Date.now(), value: '', completed: false }]);
  };

  const handlerVariant = (id: number, value: string) => {
    setVariant(variants =>
      variants.map(item => {
        if (item.id === id) {
          item.value = value;
        }
        return item;
      }),
    );
  };

  const handleToggleChange = (value: boolean) => {
    setTextIsActive(value);
  };

  const handleChecked = (id: number, value: boolean) => {
    setVariant(variants =>
      variants.map(item => {
        if (item.id === id) {
          item.completed = value;
        }
        return item;
      }),
    );
    console.log(variant);
  };

  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <div className={styles.wrapContent}>
          <h1>Добавление теста</h1>
          <div className={styles.btnAddTest}>
            <CustomButton onClick={() => setShowModal(true)}>Добавить тест</CustomButton>
          </div>
          <div className={styles.inputWrap}>
            <InformationItem variant="file" title="Изображение новости" />
          </div>
          <div className={styles.inputWrap}>
            <InformationItem title="Заголовок новости" variant="input" />
          </div>
          <div className={styles.editorBlock}>
            <h3>Описание</h3>
            <div className={styles.editorWrapper}>
              <TextEditor />
            </div>
          </div>
          <div className={styles.addBlock}>
            <InformationItem title="Вариант ответа" variant="input" />
            <InformationItem title="Вариант ответа" variant="input" />
            <InformationItem title="Вариант ответа" variant="input" />
            <button className={styles.addField} onClick={() => console.log('Добавить еще поле')}>
              Добавить еще поле
            </button>
          </div>
          <div className={styles.btnBlock}>
            <CustomButton>Опубликовть</CustomButton>
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
                items={variant}
                handlerVariant={handlerVariant}
                handleChecked={handleChecked}
              />
            )}
            <div className={styles.addVariant}>
              {!isTextActive && (
                <div>
                  <CustomButton onClick={addVariant}>Добавить вариант</CustomButton>
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
              <CustomButton>Сохранить</CustomButton>
            </div>
          </div>
        </BasicModal>
      </div>
    </div>
  );
};

export default IndexPage;
