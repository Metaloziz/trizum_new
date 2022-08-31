import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ArticleT } from 'app/types/ArticleT';
import { Descendant } from 'slate';

export type ArticlePayloadT = {
  title: string;
  content: Descendant[];
  status?: 'active';
  testId: string;
  forStudents?: boolean;
  forTeachersEducation?: boolean;
  forTeachers?: boolean;
  forFranchiseeAdmin?: boolean;
  forFranchisee?: boolean;
  forTutor?: boolean;
  forMethodist?: boolean;
};

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

  postArticle: async (newArticle: ArticlePayloadT) => {
    const { data } = await instance.post(Paths.Articles, newArticle);
    return data;
  },
};
