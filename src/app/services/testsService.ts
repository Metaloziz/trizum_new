import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ArticleTestResultPayloadT } from 'app/types/ArticleTestResultPayloadT';
import { ArticleTestResultResponseT } from 'app/types/ArticleTestResultResponseT';
import { OneTestT, TestsT } from 'app/types/TestsT';

export const testsService = {
  getTests: async (): Promise<TestsT> => {
    const { data } = await instance.get(Paths.Tests);
    return data;
  },

  getOneTest: async (
    testId: string, // todo hard cod
  ): Promise<OneTestT> => {
    const { data } = await instance.get(`${Paths.Tests}/1ed18aad-ed71-65dc-a93b-294197f27a74`);
    return data;
  },

  postArticleTestResult: async (
    result: ArticleTestResultPayloadT,
  ): Promise<ArticleTestResultResponseT> => {
    const { data } = await instance.post(`${Paths.ArticleTestResults}`, result);
    return data;
  },
};
