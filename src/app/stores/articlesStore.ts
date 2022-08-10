import { makeAutoObservable, runInAction } from 'mobx';

import { StatusTypes } from 'app/enums/StatusTypes';
import { articlesService } from 'app/services/articlesService';
import { ArticleT } from 'app/types/ArticleT';
import { blogsPreviews, MockArticleT } from 'components/blog-page/data/blogsPreviews';
import { executeError } from 'utils/executeError';
import { findElement } from 'utils/findIndexElement';

class ArticlesStore {
  article: MockArticleT = {
    // mock
    id: 0,
    title: '',
    img: '',
    text: '',
  };

  articleAPI: ArticleT = {
    id: '1',
    title: 'default',
    content: [{ text: '' }],
    test: '1',
    status: StatusTypes.draft,
    forFranchisee: true,
    forFranchiseeAdmin: true,
    forMethodist: true,
    forStudents: true,
    forTeachers: true,
    forTeachersEducation: true,
    forTutor: true,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentArticle = (articleId: number) => {
    this.article = findElement(blogsPreviews, articleId); // mock
  };

  setCurrentArticleAPI = () => {
    executeError(async () => {
      const result = await articlesService.getArticle();

      runInAction(() => {
        this.articleAPI = result;
      });
    }, this);
  };
}
export default new ArticlesStore();
