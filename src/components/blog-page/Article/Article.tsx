import React, { FC } from 'react';

import style from './Article.module.scss';

import articlesStore from 'app/stores/articlesStore';
import Image from 'components/image/Image';
import { RedirectArticlesPageButton } from 'components/test-page/RedirectArticlesPageButton/RedirectArticlesPageButton';

export const Article: FC = () => {
  const {
    article: { img, text, title },
  } = articlesStore;

  return (
    <div className={style.container}>
      <Image className={style.icon} src={img} width="460" height="460" />
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
        <RedirectArticlesPageButton />
      </div>
    </div>
  );
};
