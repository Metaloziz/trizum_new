import styles from './AddTest.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import TextEditor from 'components/text-editor/TextEditor';

const AddTestPage = () => (
  <div className={styles.content}>
    <div className={styles.innerContent}>
      <div className={styles.wrapContent}>
        <h1>Добавление теста</h1>
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
          <Button>Опубликовать</Button>
        </div>
      </div>
    </div>
  </div>
);

export default AddTestPage;
