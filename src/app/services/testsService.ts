import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ArticleTestResultPayloadT } from 'app/types/ArticleTestResultPayloadT';
import { ArticleTestResultResponseT } from 'app/types/ArticleTestResultResponseT';
import { OneTestT, TestPayloadT, TestsParamsForServer, TestsT } from 'app/types/TestsT';

type TestPayloadType = {
  title: string;
  content: []; // todo не доделано
};

export const testsService = {
  getTests: async (params?: TestsParamsForServer): Promise<TestsT> => {
    const { data } = await instance.get(Paths.Tests, { params });
    return data;
  },

  getOneTest: async (
    testId: string, // todo hard cod
  ): Promise<OneTestT> => {
    const { data } = await instance.get(`${Paths.Tests}/${testId}`);
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
};
