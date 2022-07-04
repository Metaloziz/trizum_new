import { useState } from 'react';

import styles from './AddNewsPage.module.scss';

import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import TextEditor from 'components/text-editor/TextEditor';

const roleNew = [
  { value: 'Доступно ролям', label: 'Доступно ролям' },
  { value: 'Роль 2', label: 'Роль 2' },
  { value: 'Роль 3', label: 'Роль 3' },
];

const AddNewsPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <h1>Добавление статьи</h1>
        <p>Наименование теста</p>
        <div className={styles.nameBlock}>
          <InformationItem className={styles.newsInput} variant="input" placeholder="Название" />
          <div className={styles.selectBlock}>
            <p>Роль:</p>
            <InformationItem className={styles.newsSelect} variant="select" option={roleNew} />
          </div>
          <div className={styles.addNews}>
            <Button onClick={() => setShowModal(!showModal)}>Добавление статьи</Button>
          </div>
        </div>
        <div>
          <p>Описание урока</p>
          <div className={styles.newsEditor}>
            <TextEditor />
          </div>
        </div>
        <div className={styles.newsBtn}>
          <Button>Сохранить</Button>
        </div>
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <div className={styles.modalInner}>
          <div>
            <h2>Добавление статьи</h2>
            <div className={styles.inputBlock}>
              <p>Наименование статьи</p>
              <InformationItem className={styles.inputAdd} variant="input" placeholder="Название" />
            </div>
            <div>
              <p>Описание урока</p>
              <div className={styles.textBlock}>
                <TextEditor />
              </div>
            </div>
          </div>
          <div className={styles.btn}>
            <Button>Сохранить</Button>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default AddNewsPage;
