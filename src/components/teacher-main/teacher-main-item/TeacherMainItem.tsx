import Image from 'next/image';
import { FunctionComponent } from 'react';
import styles from './TeacherMainItem.module.scss';

interface TeacherMainItemProps {
  title: string;
  img?: string;
  text: string;
}

const TeacherMainItem: FunctionComponent<TeacherMainItemProps> = ({
  title,
  img,
  text,
}) => {
  return (
    <div className={styles.containerItem}>
      <div className={styles.itemText}>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className={styles.containerButton}>
          <div>Кнопка 1</div>
          <div>Кнопка 2</div>
        </div>
      </div>
    </div>
  );
};

export default TeacherMainItem;
