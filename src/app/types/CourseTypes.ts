export type ResponseCourses = {
  id: string;
  code: string;
};
export type ResponseOneCourse = {
  id: string;
  code: string;
  works: ResponseWork[];
};

export type ResponseWork = {
  id: string;
  code: string;
};
export type RequestCreateCourse = {
  code: string;
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
