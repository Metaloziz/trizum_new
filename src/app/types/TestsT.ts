import { IdType } from 'app/types/IdType';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { StatusT } from 'app/types/StatusT';

export class TestContentT {
  question = '';

  answers = [''];

  correctAnswer = '';
}

export type ContentIDT = TestContentT & IdType;

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

  status: StatusT = 'active';

  createdAt = new TimeZoneType();

  content = [new TestContentT()];

  maxResult = 100;
}

export type TestPayloadT = Pick<OneTestBodyT, 'title' | 'content' | 'maxResult' | 'status'>;

export type OneTestT = {
  test: OneTestBodyT;
  usedInWorks: [];
};
