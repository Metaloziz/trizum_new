import { TimeZoneType } from 'app/types/AuthTypes';

type ContentT = {
  type: string;
  question: string;
  answer: string;
};

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

export type OneTestT = {
  test: {
    id: string;
    title: string;
    status: string;
    createdAt: TimeZoneType;
    content: ContentT[];
  };
  usedInWorks: [];
};
