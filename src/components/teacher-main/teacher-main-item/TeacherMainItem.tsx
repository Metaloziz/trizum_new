import Image from 'next/image';
import { FunctionComponent } from 'react';
import Button from '@components/button/Button';
import styles from './TeacherMainItem.module.scss';

interface TeacherMainItemProps {
  title: string;
  text: string;
  imgSrc: string;
}

const TeacherMainItem: FunctionComponent<TeacherMainItemProps> = ({ title, text, imgSrc }) => {
  return (
    <div className={styles.containerItem}>
      <div>
        <Image src={imgSrc} width={'300px'} height={'300px'} alt="Картинка" />
      </div>
      <div className={styles.itemText}>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className={styles.containerButton}>
          <div>
            <Button>Прочитать теорию</Button>
          </div>
          <div className={styles.btnText}>
            <Button>Пройти тест</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherMainItem;
