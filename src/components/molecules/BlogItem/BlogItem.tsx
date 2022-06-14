import { FC } from 'react';

import appStore, {Roles} from '@app/stores/appStore';
import CustomButton from '@components/custom-button/CustomButton';
import {Routes} from '@constants/Routes';
import {observer} from 'mobx-react-lite';
import Image from 'next/image';
import {useRouter} from 'next/router';

import styles from './BlogItem.module.scss';

interface Props {
  title: string;
  imgSrc?: string;
  text: string;
  id?: string | number;
}

const BlogItem: FC<Props> = observer(props => {
  const { title, imgSrc = '', text, id } = props;
  const { role } = appStore;
  const router = useRouter();
  const onReadTheoryClick = (): void => {
    router.push(`${Routes.Blog}/${id}`);
  };
  return (
    <div className={styles.containerItem}>
      <div className={styles.wrapperTeacherImg}>
        <Image src={imgSrc} width="300px" height="300px" alt="Images" />
      </div>
      <div className={styles.itemText}>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className={styles.containerButton}>
          <CustomButton onClick={onReadTheoryClick}>Прочитать теорию</CustomButton>
          {role !== Roles.Student && <CustomButton>Пройти тест</CustomButton>}
        </div>
      </div>
    </div>
  );
});

export default BlogItem;
