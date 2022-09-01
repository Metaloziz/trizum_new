import { FC } from 'react';

import style from './Article.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import articlesStore from 'app/stores/articlesStore';
import Image from 'components/image/Image';
import { RedirectCurrentPageButton } from 'components/test-page/RedirectArticlesPageButton/RedirectCurrentPageButton';
import { observer } from 'mobx-react-lite';

export const Article: FC = observer(() => {
  const {
    article: { title },
  } = articlesStore;

  return (
    <div className={style.container}>
      <Image
        className={style.icon}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU"
        width="460"
        height="460"
      />
      <div>
        <h2>{title}</h2>
        <p>text</p>
        <RedirectCurrentPageButton title="К списку статей" rout={AppRoutes.Blog} />
      </div>
    </div>
  );
});
