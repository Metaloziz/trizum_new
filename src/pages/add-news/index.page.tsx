import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import TextEditor from '@components/text-editor/TextEditor';
import styles from './AddNews.module.scss';

const IndexPage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <div className={styles.wrapContent}>
          <h1>Добавление новости</h1>
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
    </div>
  );
};

export default IndexPage;
