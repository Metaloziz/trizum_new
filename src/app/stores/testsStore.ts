import { makeAutoObservable, runInAction } from 'mobx';

import { StatusTypes } from 'app/enums/StatusTypes';
import { testsService } from 'app/services/testsService';
import { ArticleTestResultPayloadT } from 'app/types/ArticleTestResultPayloadT';
import { ContentIDT, OneTestT, PreviewTestT, TestsParamsForServer } from 'app/types/TestsT';
import { FIRST_ARRAY_ITEM } from 'constants/constants';
import { addIdElements } from 'utils/addIdElements';
import { executeError } from 'utils/executeError';

class TestsStore {
  tests: PreviewTestT[] = [
    {
      id: '1',
      title: 'draft',
      status: 'draft',
      createdAt: { date: '', timezone_type: 0, timezone: '' },
    },
  ];

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
          question: 'default ?',
          answer: 'default',
          type: StatusTypes.draft,
        },
      ],
    },
    usedInWorks: [],
  };

  questions: ContentIDT[] = [];

  currentQuestion: ContentIDT = {
    id: 1,
    question: 'default ?',
    answer: 'default',
    type: StatusTypes.draft,
  };

  result: number = 0;

  isLoading = false;

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

  setTests = (params?: TestsParamsForServer) => {
    executeError(async () => {
      const res = await testsService.getTests(params);

      runInAction(() => {
        this.tests = res.items;
        this.testsTotalCount = res.total;
        this.perPage = res.perPage;
        this.page = res.page;
      });

      const firstTest = this.tests[FIRST_ARRAY_ITEM];

      await this.setOneTest(firstTest.id);
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

  get getContent() {
    return this.currentTest.test.content;
  }

  get getTitleTest() {
    return this.currentTest.test.title;
  }
}

export default new TestsStore();
