export type ResponseWork = {
  type: string;
  index: number;
  workId: string;
};

export type ResponseCourse = {
  id: string;
  title: string;
  level: string;
  works?: ResponseWork[];
  worksCount:number
};

export type ResponseOneCourse = {
  id: string;
  code: string;
  works: ResponseWork[];
};

export type RequestCreateCourse = {
  title: string;
  level: string;
  works: ResponseWork[];
};

export type ResponseDeleteCourse = {
  result: string;
};

export type AnswerT = {
  text: string;
  correct: boolean;
};

export type QuestionT = {
  index: number;
  question: {
    id: string;
    code: string;
    text: string;
    answers: AnswerT[];
  };
};

export type TestT = {
  test: {
    id: string;
    code: string;
    title: string;
    questions: QuestionT[];
  };
};

export type WorkT = {
  id: string;
  code: string;
  picture?: string;
  /* мб код вместо тайтла подойдет */
  title: string;
  /* хз сколько слов */
  description: string;
  tests: TestT[];
};
