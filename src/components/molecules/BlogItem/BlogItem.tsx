import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import styles from './BlogItem.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import { useRouter } from 'next/router';

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
  const onTestClick = () => {
    router.push(`${AppRoutes.Testing}/${id}`);
  };
  const onReadTheoryClick = (): void => {
    router.push(`${AppRoutes.Blog}/${id}`);
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
          <Button onClick={onReadTheoryClick}>Прочитать теорию</Button>
          {role !== Roles.Student && <Button onClick={onTestClick}>Пройти тест</Button>}
        </div>
      </div>
    </div>
  );
});

export default BlogItem;
