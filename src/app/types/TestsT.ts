import { StatusTypes } from 'app/enums/StatusTypes';
import { IdType } from 'app/types/IdType';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { StatusT } from 'app/types/StatusT';

export class ContentT {
  type = StatusTypes.active;

  question = '';

  answer = '';
}

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

export class OneTestBodyT {
  id = '';

  title = '';

  status = '';

  createdAt = new TimeZoneType();

  content = [new ContentT()];

  maxResult = 100;
}

export type OneTestT = {
  test: OneTestBodyT;
  usedInWorks: [];
};

export type TestsParamsForServer = Partial<{
  page: number;
  per_page: number;
  status: StatusT;
}>;
