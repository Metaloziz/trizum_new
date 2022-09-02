import { FC } from 'react';

import style from './Article.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import articlesStore from 'app/stores/articlesStore';
import Image from 'components/image/Image';
import { RedirectCurrentPageButton } from 'components/test-page/RedirectArticlesPageButton/RedirectCurrentPageButton';
import { observer } from 'mobx-react-lite';
import { getParagraphs } from 'components/blog-page/Article/util/getParagraph';
import image from '../../../assets/images/teacher.svg';

export const Article: FC = observer(() => {
  const {
    article: { title, content },
  } = articlesStore;

  return (
    <div className={style.container}>
      <Image className={style.icon} src={image} width="460" height="460" />
      <div>
        <h2>{title}</h2>

        <div className={style.paragraphs}>{getParagraphs(content)}</div>
        <RedirectCurrentPageButton title="К списку статей" rout={AppRoutes.Blog} />
        {/* <RedirectCurrentPageButton title="Пройти тест" rout={AppRoutes.Blog} /> */}
      </div>
    </div>
  );
});
