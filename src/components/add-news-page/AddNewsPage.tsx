import { useState } from 'react';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import TextEditor from '@components/text-editor/TextEditor';
import styles from './AddNewsPage.module.scss';

const roleNew = [
  { value: 'Роль 1', label: 'Роль 1' },
  { value: 'Роль 2', label: 'Роль 2' },
  { value: 'Роль 3', label: 'Роль 3' },
];

const AddNewsPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <div className={styles.wrapContent}>
          <h1>Добавление новости</h1>
          <div className={styles.wrapBtn}>
            <CustomButton onClick={() => setShowModal(true)}>
              Добавить новость
            </CustomButton>
          </div>
          <div className={styles.inputWrap}>
            <InformationItem variant={'file'} title={'Изображение новости'} />
          </div>
          <div className={styles.inputWrap}>
            <InformationItem title={'Заголовок новости'} variant={'input'} />
          </div>
          <div className={styles.editorBlock}>
            <h3>Описание</h3>
            <div className={styles.editorWrapper}>
              <TextEditor />
            </div>
          </div>
          <div className={styles.btnBlock}>
            <CustomButton>Опубликовть</CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.modalWrap}>
        <BasicModal visibility={showModal} changeVisibility={setShowModal}>
          <div className={styles.modalInner}>
            <div>
              <h2>Добавление статьи</h2>
              <div className={styles.choiceBlock}>
                <div className={styles.inputBlock}>
                  <InformationItem
                    variant={'input'}
                    title={'Наименование теста'}
                    placeholder={'Название'}
                  />
                </div>
                <div className={styles.modalSelect}>
                  <InformationItem
                    variant={'select'}
                    title={'Роль:'}
                    option={roleNew}
                    placeholder={'Ваша роль'}
                  />
                </div>
              </div>
              <div className={styles.description}>
                <p>Описание урока</p>
                <div className={styles.textBlock}>
                  <TextEditor />
                </div>
              </div>
            </div>
            <div className={styles.btn}>
              <CustomButton>Сохранить</CustomButton>
            </div>
          </div>
        </BasicModal>
      </div>
    </div>
  );
};

export default AddNewsPage;
