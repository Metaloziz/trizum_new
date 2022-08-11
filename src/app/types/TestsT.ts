import { StatusTypes } from 'app/enums/StatusTypes';
import { TimeZoneType } from 'app/types/AuthTypes';
import { IdType } from 'app/types/IdType';

export type ContentT = {
  type: StatusTypes;
  question: string;
  answer: string;
};

export type ContentIDT = ContentT & IdType;

export type PreviewTestT = {
  id: string;
  title: string;
  status: null;
  createdAt: TimeZoneType;
};

export type TestsT = {
  items: PreviewTestT[];
  page: number;
  perPage: number;
  total: number;
};

export type OneTestBodyT = {
  id: string;
  title: string;
  status: string;
  createdAt: TimeZoneType;
  content: ContentT[];
};

export type OneTestT = {
  test: OneTestBodyT;
  usedInWorks: [];
};
