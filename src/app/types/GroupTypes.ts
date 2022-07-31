import { TimeZoneType } from './AuthTypes';

import { FranchiseT } from 'app/types/FranchiseTypes';
import { Nullable } from 'app/types/Nullable';
import { ResponseUserT } from 'app/types/UserTypes';

export type ResponseGroups = {
  id: string;
  name: string;
  type: Nullable<string>;
  status: Nullable<string>;
  level: Nullable<string>;
  startedAt: TimeZoneType;
  endedAt: TimeZoneType;
  franchise: string;
};

export type ResponseOneGroup = {
  id: string;
  code: string;
  franchise: FranchiseT;
  users: [
    {
      id: string;
      stats: any[];
      user: ResponseUserT;
    },
  ];
};

export type CreateGroup = {
  name: string;
  franchiseId: string;
  dateSince: string;
  dateUntil: string;
  type: string;
  teacherId: string;
  level: string;
  courseId: string;
};
