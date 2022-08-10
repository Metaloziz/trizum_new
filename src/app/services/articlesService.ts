import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ArticleT } from 'app/types/ArticleT';

export const articlesService = {
  getArticles: async () => {
    const { data } = await instance.get(Paths.Articles);
    return data;
  },

  getArticle: async (
    articleId: string = '1ed18ab0-bdbe-6328-9a4d-57820af0955f', // todo hard code
  ): Promise<ArticleT> => {
    const { data } = await instance.get(`${Paths.Articles}/${articleId}`);
    return data;
  },
};
