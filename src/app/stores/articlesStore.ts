import { makeAutoObservable, runInAction } from 'mobx';

import { StatusTypes } from 'app/enums/StatusTypes';
import { articlesService } from 'app/services/articlesService';
import { ArticleT } from 'app/types/ArticleT';
import { executeError } from 'utils/executeError';
import { ArticleDescriptionType } from 'components/add-news-page/AddNewsPage';
import { findDescription } from 'utils/findDescription';
import { ArticlePayloadT } from 'app/types/ArticlePayloadT';
import { GetArticlesParams } from 'app/types/GetArticlesParams';

type ArticleStoreType = ArticleT & { description: ArticleDescriptionType };

class ArticlesStore {
  articles: ArticleStoreType[] = [
    // todo спросить на счёт продуктивности, так как при запросе массива возвращаются все статьи целиком
    {
      id: '1',
      title: 'default',
      description: { type: '', text: '' },
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
    },
  ];

  page = 0;

  perPage = 10;

  total = 1;

  isSuccessPost: boolean | null = null;

  article: ArticleStoreType = {
    id: '1',
    title: 'default',
    content: [{ text: '' }],
    description: { type: '', text: '' }, // not from API
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

  private searchArticlesParams: GetArticlesParams = {
    page: 0,
    perPage: 10,
  };

  constructor() {
    makeAutoObservable(this);
  }

  getArticles = () => {
    executeError(async () => {
      const result = await articlesService.getArticles(this.searchArticlesParams);

      runInAction(() => {
        this.articles = result.items.map(article => ({
          ...article,
          description: findDescription(article.content),
        }));
        this.page = result.page;
        this.perPage = result.perPage;
        this.total = result.total;
      });
    }, this);
  };

  setSearchArticlesParams = (params: GetArticlesParams) => {
    runInAction(() => {
      this.searchArticlesParams = { ...this.searchArticlesParams, ...params };
    });
  };

  getCurrentArticle = (articleId: string) => {
    executeError(async () => {
      const result = await articlesService.getArticle(articleId);

      runInAction(() => {
        const description = findDescription(result.content);

        this.article = { ...result, description };
      });
    }, this);
  };

  postArticle = (newArticle: ArticlePayloadT) => {
    executeError(async () => {
      const result = await articlesService.postArticle(newArticle);

      if (result?.id) {
        this.getCurrentArticle(result.id);
      }
      runInAction(() => {
        this.isSuccessPost = !!result?.id;
      });
    }, this);
  };
}
export default new ArticlesStore();
