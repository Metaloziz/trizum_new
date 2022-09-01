import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './BlogItem.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import testsStore from 'app/stores/testsStore';
import Button from 'components/button/Button';
import Image from 'components/image/Image';

interface Props {
  id: string;
  title: string;
  imgSrc?: string;
  description: string;
}

const BlogItem: FC<Props> = observer(({ title, imgSrc = '', description, id }) => {
  const { role } = appStore;
  const { getCurrentArticle } = articlesStore;
  const { currentTest } = testsStore;

  const navigate = useNavigate();

  const onTestClick = () => {
    navigate(`${AppRoutes.Testing}/${currentTest.test.title}`); // todo решить баг с дефолтным url
  };

  const onReadTheoryClick = (): void => {
    getCurrentArticle(id);
    navigate(`${AppRoutes.Blog}/${title}`);
  };

  return (
    <div className={styles.containerItem}>
      <div className={styles.wrapperTeacherImg}>
        <Image src={imgSrc} alt="Images" />
      </div>
      <div className={styles.itemText}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.containerButton}>
          <Button onClick={onReadTheoryClick}>Прочитать теорию</Button>
          {role !== Roles.Student && <Button onClick={onTestClick}>Пройти тест</Button>}
        </div>
      </div>
    </div>
  );
});

export default BlogItem;
