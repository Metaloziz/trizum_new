import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ArticleT } from 'app/types/ArticleT';
import { WithPagination } from 'app/types/WithPagination';
import { ArticlePayloadT } from 'app/types/ArticlePayloadT';
import { GetArticlesParams } from 'app/types/GetArticlesParams';

export const articlesService = {
  getArticles: async (params?: GetArticlesParams) => {
    const { data } = await instance.get<WithPagination<ArticleT[]>>(Paths.Articles, {
      params,
    });
    return data;
  },

  getArticle: async (articleId: string): Promise<ArticleT> => {
    const { data } = await instance.get(`${Paths.Articles}/${articleId}`);
    return data;
  },

  postArticle: async (newArticle: ArticlePayloadT) => {
    const { data } = await instance.post(Paths.Articles, newArticle);
    return data;
  },
};
