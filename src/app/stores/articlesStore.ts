import { makeAutoObservable } from 'mobx';

import { blogsPreviews, MockArticleT } from 'components/blog-page/data/blogsPreviews';
import { findElement } from 'utils/findIndexElement';

class ArticlesStore {
  article: MockArticleT = {
    id: 0,
    title: '',
    img: '',
    text: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentArticle = (articleId: number) => {
    this.article = findElement(blogsPreviews, articleId);
  };
}
export default new ArticlesStore();
