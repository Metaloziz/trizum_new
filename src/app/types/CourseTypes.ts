import { TimeZoneType } from 'app/types/TimeZoneType';
import { GroupTypes } from 'app/enums/GroupTypes';
import { HomeworkViewModel } from 'app/viewModels/HomeworkViewModel';

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
  type: string;
};

export type ResponseOneCourse = {
  id: string;
  code: string;
  works: ResponseWork[];
};

export type GetCoursesParams = {
  perPage?: number;
  page?: number;
  type?: keyof typeof GroupTypes;
};

export type RequestCreateCourse = {
  title: string;
  type: string;
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
