import { TimeZoneType } from './AuthTypes';

import { GroupLevels } from 'app/enums/GroupLevels';
import { GroupType } from 'app/enums/GroupTypes';
import { EmptyUser } from 'app/stores/appStore';
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
  createdAt: TimeZoneType;
  franchise: string;
  course: string;
  teacherId: string;
};

export type ResponseOneGroup = {
  id: string;
  name: string;
  type: string;
  status: string;
  level: string;
  startedAt: TimeZoneType;
  endedAt: TimeZoneType;
  franchise: FranchiseT;
  course: any;
  teacherId: any;
  users: [
    {
      id: string;
      stats: any[];
      user: EmptyUser;
    },
  ];
};

export type GroupT = keyof typeof GroupType;
export type LevelGroupT = keyof typeof GroupLevels;

export type CreateGroup = {
  name: string;
  franchiseId: string;
  dateSince: string;
  dateUntil: string;
  type: GroupT;
  teacherId: string;
  level: LevelGroupT;
  courseId: string;
  status: string;
};

export type GroupParams = Partial<{
  perPage: number;
  page: number;
  franchiseId: string;
  dateSince: string;
  dateUntil: string;
  forGroupId: string;
  type: string;
  teacherId: string;
  name: string;
  level: string;
}>;
