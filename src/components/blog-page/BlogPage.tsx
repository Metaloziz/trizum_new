import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './BlogPage.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import { Roles } from 'app/stores/appStore';
import articlesStore from 'app/stores/articlesStore';
import Button from 'components/button/Button';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';
import Pagination from '@mui/material/Pagination';
import { ArticlePreview } from 'components/blog-page/ArticlePreview/ArticlePreview';
import { whoCanUseIt } from 'utils/whoCanUseIt';

const BlogPage: FunctionComponent = observer(() => {
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

  return (
    <div className={styles.container}>
      {whoCanUseIt([Roles.Admin, Roles.Methodist]) && (
        <div className={styles.buttonsBox}>
          <div className={styles.buttonArticle}>
            <Button onClick={onClickAddPost}>Добавить статью</Button>
          </div>
          <div>
            <Button onClick={onClickAddTest}>Добавить тест</Button>
          </div>
        </div>
      )}
      <ArticlePreview articles={articles} />
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
