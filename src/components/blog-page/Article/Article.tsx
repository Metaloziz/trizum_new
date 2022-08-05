import React, { FC } from 'react';

import { useParams } from 'react-router-dom';

import style from './Article.module.scss';

import { blogsPreviews } from 'components/blog-page/data/blogsPreviews';
import Image from 'components/image/Image';

export const Article: FC = () => {
  const { articleName } = useParams();
  const { img, text } = blogsPreviews[0];

  return (
    <div className={style.container}>
      <Image src={img} width="460" height="460" />
      <div>
        <h2>{articleName}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};
