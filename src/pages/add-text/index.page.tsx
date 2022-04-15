import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import TextEditor from '@components/text-editor/TextEditor';
import styles from './AddText.module.scss';

const IndexPage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <div className={styles.wrapContent}>
          <h1>Добавление текста</h1>
          <div className={`${styles.inputWrap} ${styles.inputFile}`}>
            <div>
              <p>Изображение новости</p>
            </div>
            <div>
              <input type={'file'} placeholder={'image.png'} id={'file'} />
              <label htmlFor="file">
                <span>image.png</span>
              </label>
            </div>
          </div>
          <div className={styles.inputWrap}>
            <InformationItem title={'Заголовок новости'} variant={'input'} />
          </div>
          <div className={styles.editorBlock}>
            <h3>Описание</h3>
            <div>
              <TextEditor />
            </div>
          </div>
          <div className={styles.addBlock}>
            <InformationItem title={'Вариант ответа'} variant={'input'} />
            <InformationItem title={'Вариант ответа'} variant={'input'} />
            <InformationItem title={'Вариант ответа'} variant={'input'} />
            <div className={styles.addАField}>Добавить еще поле</div>
          </div>
          <div className={styles.btnBlock}>
            <CustomButton>Опубликовть</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
