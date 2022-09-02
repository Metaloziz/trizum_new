import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ArticleT } from 'app/types/ArticleT';
import { WithPagination } from 'app/types/WithPagination';
import { ArticlePayloadT } from 'app/types/ArticlePayloadT';
import { SearchParams } from 'app/types/SearchParams';
import { ArticlesStoreType } from 'app/stores/articlesStore';

type Result = {
  result: 'done';
};

export const articlesService = {
  getArticles: async (params?: SearchParams) => {
    const { data } = await instance.get<WithPagination<ArticlesStoreType[]>>(Paths.Articles, {
      params,
    });
    return data;
  },

  getArticle: async (articleId: string): Promise<ArticleT> => {
    const { data } = await instance.get(`${Paths.Articles}/${articleId}`);
    return data;
  },

  postArticle: async (newArticle: ArticlePayloadT) => {
    const { data } = await instance.post<ArticleT>(Paths.Articles, newArticle);
    return data;
  },

  editArticle: async (articleId: string, newArticle: Partial<ArticlePayloadT>) => {
    const { data } = await instance.post<ArticleT>(`${Paths.Articles}/${articleId}`, newArticle);
    return data;
  },

  deleteArticle: async (articleId: string) => {
    const { data } = await instance.delete<Result>(`${Paths.Articles}/${articleId}`);

    return data;
  },
};
