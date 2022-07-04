import { TimeZoneType } from 'app/types/AuthTypes';

export type ResponseWork = {
  id: string;
  title: string;
  text: string;
  type: string;
  gamePresetCount: number;
};

export type ResponseCourse = {
  id: string;
  title: string;
  level: string;
  works?: ResponseWork[];
  worksCount: number;
  createdAt: TimeZoneType;
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

export type RequestEditCourseWork = {
  type: string;
  index: number;
  workId: string;
};

export type RequestEditCourse = {
  title: string;
  level: string;
  works: RequestEditCourseWork[];
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

export type GamePresetT = {
  gamePreset: {
    id: string;
    name: string;
    gameId: string;
  };
};

export type WorkWithCourseBonded = {
  id: string;
  index: number;
  work: Omit<ResponseWork, 'gamePresetCount'> & { gamePresets?: GamePresetT[] };
};

export type ResponseOneFullCourse = {
  id: string;
  title: string;
  level: string;
  worksCount: number;
  createdAt: TimeZoneType;
  works: WorkWithCourseBonded[];
};