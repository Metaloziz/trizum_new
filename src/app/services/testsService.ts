import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { OneTestT, TestsT } from 'app/types/TestsT';

const testsService = {
  getTests: async (): Promise<TestsT> => {
    const { data } = await instance.get(Paths.Tests);
    return data;
  },

  getOneTest: async (
    testId: string, // todo hard cod
  ): Promise<OneTestT> => {
    const { data } = await instance.get(`${Paths.Tests}/1ed17d1c-74e4-61b2-91d6-e155f576ccf7`);
    return data;
  },
};
export default testsService;
