import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { OneTestT, TestsT } from 'app/types/TestsT';

const testsService = {
  getTests: async (): Promise<TestsT> => {
    const { data } = await instance.get(Paths.Tests);
    return data;
  },

  getOneTest: async (
    testId: string = '1ed069df-a482-69e2-a064-211f2c883f3d', // todo hard cod
  ): Promise<OneTestT> => {
    const { data } = await instance.get(`${Paths.Tests}/${testId}`);
    return data;
  },
};
export default testsService;
