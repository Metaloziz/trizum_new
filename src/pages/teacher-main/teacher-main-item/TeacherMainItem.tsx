import Image from 'next/image';
import { FC } from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import styles from './TeacherMainItem.module.scss';

interface TeacherMainItemProps {
  title: string;
  imgSrc?: string;
  text: string;
}

const TeacherMainItem: FC<TeacherMainItemProps> = ({
  title,
  imgSrc = '',
  text,
}) => {
  return (
    <div className={styles.containerItem}>
      <div className={styles.wrapperTeacherImg}>
        <Image src={imgSrc} width={'300px'} height={'300px'} alt="Images" />
      </div>
      <div className={styles.itemText}>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className={styles.containerButton}>
          <CustomButton>Прочитать теорию</CustomButton>
          <CustomButton>Пройти тест</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TeacherMainItem;
