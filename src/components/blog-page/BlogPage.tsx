import React, { FunctionComponent, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './BlogPage.module.scss';
import { blogsPreviews } from './data/blogsPreviews';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import Button from 'components/button/Button';
import BlogItem from 'components/molecules/BlogItem';
import BasicModal from 'components/basic-modal/BasicModal';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';

const BlogPage: FunctionComponent = observer(() => {
  const { role } = appStore;
  const { setCurrentArticleAPI } = articlesStore;

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setCurrentArticleAPI();
  }, []);

  const navigate = useNavigate();

  const onClickAddPost = () => {
    setShowModal(true);
    navigate(`${AppRoutes.Blog}/add-post`);
  };

  const onClickAddTest = () => {
    navigate(`${AppRoutes.Testing}/${SecondaryRoutes.AddTest}`);
  };

  const isAdmin = () => {
    switch (role) {
      case Roles.Admin:
      case Roles.Methodist:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className={styles.container}>
      {isAdmin() && (
        <>
          <Button onClick={onClickAddPost}>Добавить статью</Button>
          <Button onClick={onClickAddTest}>Добавить тест</Button>
        </>
      )}
      {blogsPreviews.map(item => (
        <BlogItem
          id={item.id}
          key={item.id}
          title={item.title}
          text={item.text}
          imgSrc={item.img}
        />
      ))}
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <div>добавить тест</div>
      </BasicModal>
    </div>
  );
});

export default BlogPage;
