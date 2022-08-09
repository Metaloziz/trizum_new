import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ArticleT } from 'app/types/ArticleT';

export const articlesService = {
  getArticles: async () => {
    const { data } = await instance.get(Paths.Articles);
    return data;
  },

  getArticle: async (
    articleId: string = '1ed17dda-a941-6180-a37b-c90ebc24c208', // todo hard code
  ): Promise<ArticleT> => {
    const { data } = await instance.get(`${Paths.Articles}/${articleId}`);
    return data;
  },
};
