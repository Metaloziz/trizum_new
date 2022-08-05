import { FunctionComponent } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './BlogPage.module.scss';
import { blogsPreviews } from './data/blogsPreviews';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import Button from 'components/button/Button';
import BlogItem from 'components/molecules/BlogItem';

const BlogPage: FunctionComponent = observer(() => {
  const { role } = appStore;

  const navigate = useNavigate();

  const onClickAddPost = () => {
    navigate(`${AppRoutes.Blog}/add-post`);
  };

  const onClickAddTest = () => {
    navigate(`${AppRoutes.Blog}/add-test`);
  };

  return (
    <div className={styles.container}>
      {role === Roles.Methodist && (
        <>
          <Button onClick={onClickAddPost}>Добавить статью</Button>
          <Button onClick={onClickAddTest}>Добавить тест</Button>
        </>
      )}
      {blogsPreviews.map(item => (
        <BlogItem
          key={item.id}
          title={item.title}
          text={item.text}
          imgSrc={item.img}
          id={item.id}
        />
      ))}
    </div>
  );
});

export default BlogPage;
