import { ArticlesStoreType } from 'app/stores/articlesStore';
import React, { FC } from 'react';
import { findPictureUrl } from 'utils/findPictureUrl';
import BlogItem from 'components/molecules/BlogItem';

type Props = {
  articles: ArticlesStoreType[];
};
export const ArticlePreview: FC<Props> = ({ articles }) => (
  <div>
    {articles.map(item => {
      const picture = findPictureUrl(item.content);

      return (
        <BlogItem
          id={item.id}
          key={item.id}
          title={item.title}
          description={item.description.text}
          imgSrc={picture}
          testId={item.test}
        />
      );
    })}
  </div>
);
