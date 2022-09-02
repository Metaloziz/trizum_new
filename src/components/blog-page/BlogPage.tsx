import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './BlogPage.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import Button from 'components/button/Button';
import BlogItem from 'components/molecules/BlogItem';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';
import Pagination from '@mui/material/Pagination';
import image from '../../assets/images/teacher.svg';

const BlogPage: FunctionComponent = observer(() => {
  const { role } = appStore;
  const { articles, getArticles, page, perPage, total, setSearchArticlesParams } = articlesStore;

  const [currentPage, setCurrentPage] = useState(page + 1);

  const onPageChange = (event: ChangeEvent<unknown>, newCurrentPage: number) => {
    setSearchArticlesParams({ page: newCurrentPage - 1 });
    setCurrentPage(newCurrentPage);
    getArticles();
  };

  useEffect(() => {
    getArticles();
  }, []);

  const navigate = useNavigate();

  const onClickAddPost = () => {
    navigate(`${AppRoutes.Blog}/${SecondaryRoutes.AddArticle}`);
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
      {articles.map(item => (
        <BlogItem
          id={item.id}
          key={item.id}
          title={item.title}
          description={item.description.text}
          imgSrc={image}
        />
      ))}
      <div className={styles.pagination}>
        <Pagination
          count={Math.ceil(total / perPage)}
          color="primary"
          size="large"
          page={currentPage}
          boundaryCount={1}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
});

export default BlogPage;
