import { makeAutoObservable } from 'mobx';

import testsService from 'app/services/testsService';
import { OneTestT, PreviewTestT } from 'app/types/TestsT';
import { executeError } from 'utils/executeError';

class TestsStore {
  tests: PreviewTestT[] = [];

  testsTotalCount = 1;

  page = 1;

  perPage = 5;

  currentTest?: OneTestT;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getTests = async () => {
    executeError(async () => {
      const res = await testsService.getTests();

      this.tests = res.items;
      this.testsTotalCount = res.total;
      this.perPage = res.perPage;
      this.page = Number(res.page);
    }, this);
  };

  getOneTest = async () => {
    executeError(async () => {
      this.currentTest = await testsService.getOneTest();
    }, this);
  };
}

export default new TestsStore();
