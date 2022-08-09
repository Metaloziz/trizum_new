import { makeAutoObservable } from 'mobx';

import { StatusTypes } from 'app/enums/StatusTypes';
import testsService from 'app/services/testsService';
import { OneTestT, PreviewTestT } from 'app/types/TestsT';
import { FIRST_ARRAY_ITEM } from 'utils/consts/consts';
import { executeError } from 'utils/executeError';

class TestsStore {
  tests: PreviewTestT[] = [];

  testsTotalCount = 1;

  page = 1;

  perPage = 5;

  currentTest: OneTestT = {
    test: {
      id: '1',
      status: 'default',
      title: 'default',
      createdAt: {
        date: 'default',
        timezone_type: 1,
        timezone: 'default',
      },
      content: [
        {
          question: 'default',
          answer: 'default',
          type: StatusTypes.draft,
        },
      ],
    },
    usedInWorks: [],
  };

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getOneTest = async (testId: string) => {
    executeError(async () => {
      this.currentTest = await testsService.getOneTest(testId);
    }, this);
  };

  getTests = async () => {
    executeError(async () => {
      const res = await testsService.getTests();

      this.tests = res.items;
      this.testsTotalCount = res.total;
      this.perPage = res.perPage;
      this.page = Number(res.page);

      const firstTest = res.items[FIRST_ARRAY_ITEM];

      await this.getOneTest(firstTest.id);
    }, this);
  };
}

export default new TestsStore();
