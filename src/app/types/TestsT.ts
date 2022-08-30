import { StatusTypes } from 'app/enums/StatusTypes';
import { IdType } from 'app/types/IdType';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { StatusT } from 'app/types/StatusT';

export type ContentT = {
  type: StatusTypes;
  question: string;
  answer: string;
};

export type ContentIDT = ContentT & IdType;

export type PreviewTestT = {
  id: string;
  title: string;
  status: StatusT;
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

export type TestsParamsForServer = Partial<{
  page: number;
  per_page: number;
  status: StatusT;
}>;
