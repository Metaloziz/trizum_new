import { useState } from 'react';

import AddVariantList from '@components/add-test-page/add-variant/addVariantList';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import Step from '@components/step/Step';
import TextEditor from '@components/text-editor/TextEditor';
import Toggle from '@components/toggle/Toggle';

import styles from './AddTest.module.scss';

export type stateVariantType = {
  id: number;
  completed: boolean;
  value: string;
};

export type stateFieldType = {
  id: number;
  value: string;
};


const rolesNew = [
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
  const [variantModal, setVariantModal] = useState<Array<stateVariantType>>([]);
  const [isTextActive, setTextIsActive] = useState<boolean>(true);

  const addVariantModal = () => {
    setVariantModal(value => [...value, { id: Date.now(), value: '', completed: false }]);
  };

  const handlerVariantModal = (id: number, value: string) => {
    setVariantModal(variants =>
      variants.map(item => {
        if (item.id === id) {
          item.value = value;
        }
        return item;
      }),
    );
  };

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
        <h1>Добавление теста</h1>
        <CustomButton onClick={() => setShowModal(!showModal)}>Добавить тест</CustomButton>
        <p>Наименование теста</p>
        <div className={styles.wrapContent}>
          <InformationItem className={styles.nameInput} variant='input' placeholder='Название' />
          <div className={styles.nameSelect}>
            <p>Роль:</p>
            <InformationItem className={styles.selectRoles} variant='select' option={rolesNew} />
          </div>
        </div>
        <div>
          <p>Текст вопроса</p>
          <div className={styles.testEditor}>
            <TextEditor />
          </div>
        </div>
        <div className={styles.choice}>
          {!isTextActive && (
            <AddVariantList
              items={variant}
              handlerVariant={handlerVariant}
              handleChecked={handleChecked}
            />
          )}
          <div className={styles.addInput}>
            {!isTextActive && (
              <div className={styles.addBtn}>
                <CustomButton onClick={addVariant}>Добавить вариант</CustomButton>
              </div>
            )}
            <div className={styles.choiceToggle}>
              <p>Вариативный</p>
              <div>
                <Toggle defaultValue={isTextActive} onChange={handleToggleChange} size='small' />
              </div>
              <p>Текстовый</p>
            </div>
          </div>
          <div className={styles.testStep}>
            <Step countStep={4} />
            <CustomButton>Сохранить</CustomButton>
          </div>
        </div>
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <div className={styles.modalContainer}>
          <h2>Добавление теста</h2>
          <div className={styles.titleInput}>
            <p>Наименование теста</p>
            <InformationItem className={styles.testInput} variant='input' placeholder='Название' />
          </div>
          <div className={styles.textQuestion}>
            <p>Текст вопроса</p>
            <div className={styles.textEditorModal}>
              <TextEditor />
            </div>
          </div>
            <AddVariantList
              items={variantModal}
              handlerVariant={handlerVariantModal}
            />
          <div className={styles.variantBtn} onClick={addVariantModal}>
            <p />
            <CustomButton>Добавить вариант</CustomButton>
          </div>
          <div className={styles.btnSave}>
            <CustomButton>Сохранить</CustomButton>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default IndexPage;
