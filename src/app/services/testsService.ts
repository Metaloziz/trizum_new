import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ArticleTestResultPayloadT } from 'app/types/ArticleTestResultPayloadT';
import { ArticleTestResultResponseT } from 'app/types/ArticleTestResultResponseT';
import { OneTestT, TestPayloadT, TestsT } from 'app/types/TestsT';
import { TestSearchParams } from 'app/stores/testsStore';

export const testsService = {
  getTests: async (params: TestSearchParams): Promise<TestsT> => {
    const { data } = await instance.get(Paths.Tests, { params });
    return data;
  },

  getOneTest: async (testId: string) => {
    const { data } = await instance.get<OneTestT>(`${Paths.Tests}/${testId}`);
    return data;
  },

  postTest: async (test: TestPayloadT) => {
    const { data } = await instance.post(Paths.Tests, test);
    return data;
  },

  postArticleTestResult: async (
    result: ArticleTestResultPayloadT,
  ): Promise<ArticleTestResultResponseT> => {
    const { data } = await instance.post(`${Paths.ArticleTestResults}`, result);
    return data;
  },

  editTest: async (testId: string, newTestData: Partial<TestPayloadT>) => {
    const { data } = await instance.post(`${Paths.Tests}/${testId}`, newTestData);
    return data;
  },

  // deleteTest: async (testId: string) => { // todo доделать удаление
  //   const { data } = await instance.delete<Result>(`${Paths.Articles}/${articleId}`);
  //
  //   return data;
  // },
};
