import { makeAutoObservable, runInAction } from 'mobx';
import { testsService } from 'app/services/testsService';
import { ArticleTestResultPayloadT } from 'app/types/ArticleTestResultPayloadT';
import { ContentIDT, OneTestBodyT, OneTestT, PreviewTestT, TestPayloadT } from 'app/types/TestsT';
import { FIRST_ARRAY_ITEM } from 'constants/constants';
import { addIdElements } from 'utils/addIdElements';
import { executeError } from 'utils/executeError';
import { StatusT } from 'app/types/StatusT';

export type TestSearchParams = Partial<{
  status: StatusT;
  page: number;
  per_page: number;
}>;

class TestsStore {
  tests: PreviewTestT[] = [
    {
      id: '1',
      title: 'draft',
      status: 'draft',
      createdAt: { date: '', timezone_type: 0, timezone: '' },
    },
  ];

  total = 1;

  page = 1;

  perPage = 5;

  result: number = 0;

  currentTest: OneTestT = {
    test: new OneTestBodyT(),
    usedInWorks: [],
  };

  questions: ContentIDT[] = [];

  currentQuestion: ContentIDT = {
    id: 1,
    question: 'default',
    answers: ['default'],
    correctAnswer: 'default',
  };

  isLoading = false;

  private searchParams: TestSearchParams = {
    per_page: 0,
    status: 'active',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setOneTest = async (testId: string) => {
    executeError(async () => {
      const result = await testsService.getOneTest(testId);

      runInAction(() => {
        this.currentTest = result;

        const newQuestion = addIdElements(result.test.content);

        this.questions = newQuestion;
        this.currentQuestion = newQuestion[FIRST_ARRAY_ITEM];
      });
    }, this);
  };

  setTests = () => {
    executeError(async () => {
      const res = await testsService.getTests(this.searchParams);

      runInAction(() => {
        this.tests = res.items;
        this.total = res.total;
        this.perPage = res.perPage;
        this.page = res.page;

        this.setSearchParams({ page: res.page, per_page: res.perPage });
      });

      const firstTest = this.tests[FIRST_ARRAY_ITEM];

      await this.setOneTest(firstTest.id);
    }, this);
  };

  setSearchParams = (params: TestSearchParams) => {
    runInAction(() => {
      this.searchParams = { ...this.searchParams, ...params };
    });
  };

  postTest = (test: TestPayloadT) => {
    executeError(async () => {
      const res = await testsService.postTest(test);
    }, this);
  };

  postResult = (result: ArticleTestResultPayloadT) => {
    executeError(async () => {
      const res = await testsService.postArticleTestResult(result);
    }, this);
  };

  incrementResult = () => {
    runInAction(() => {
      this.result += 1;
    });
  };

  resetResult = () => {
    runInAction(() => {
      this.result = 0;
    });
  };

  setCurrentQuestion = (question: ContentIDT) => {
    this.currentQuestion = question;
  };

  get getTitleTest() {
    return this.currentTest.test.title;
  }
}

export default new TestsStore();
