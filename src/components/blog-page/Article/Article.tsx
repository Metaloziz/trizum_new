import { FC, useEffect } from 'react';

import style from './Article.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import articlesStore from 'app/stores/articlesStore';
import Image from 'components/image/Image';
import { RedirectCurrentPageButton } from 'components/test-page/RedirectArticlesPageButton/RedirectCurrentPageButton';
import { observer } from 'mobx-react-lite';
import { getParagraphs } from 'components/blog-page/Article/util/getParagraph';
import { findPictureUrl } from 'utils/findPictureUrl';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';
import testsStore from 'app/stores/testsStore';

export const Article: FC = observer(() => {
  const {
    article: {
      title,
      content,
      test: { id },
    },
  } = articlesStore;

  const { setOneTest } = testsStore;

  useEffect(() => {
    setOneTest(id);
  }, []);

  const picture = findPictureUrl(content);

  return (
    <div className={style.container}>
      <Image
        className={style.icon}
        src={picture}
        width="460"
        height="460"
        style={{ objectFit: 'scale-down' }}
      />
      <div>
        <h2>{title}</h2>

        <div className={style.paragraphs}>{getParagraphs(content)}</div>
        <RedirectCurrentPageButton title="К списку статей" rout={AppRoutes.Blog} />
        <RedirectCurrentPageButton
          title="Пройти тест"
          rout={`${AppRoutes.Testing}/${SecondaryRoutes.CurrentElement}`}
        />
      </div>
    </div>
  );
});
