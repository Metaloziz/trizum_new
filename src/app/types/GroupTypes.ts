import moment from 'moment';

import { TimeZoneType } from './AuthTypes';

import { DateTime } from 'app/enums/DateTime';
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

export type ResponseOneGroupCourse = {
  id: string;
  type: string;
  status: string;
  title: string;
  level: string;
  worksCount: number;
  createdAt: TimeZoneType;
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
  course: ResponseOneGroupCourse;
  teacherId: any;
  users: [
    {
      id: string;
      stats: any[];
      user: EmptyUser;
    },
  ];
  schedule?: LessonStringValuesT[];
};

export class LessonT {
  id: string;

  name: string;

  date: Date;

  from: Date;

  to: Date;

  constructor(id?: string) {
    const today = moment(new Date())
      .format(DateTime.DdMmYyyy)
      .split('.')
      .map(el => Number(el));
    this.name = '';
    this.id = id || (Math.random() * 100).toString();
    this.date = new Date();
    this.from = new Date(today[2], today[1], today[0], 8, 0);
    this.to = new Date(today[2], today[1], today[0], 8, 45);
  }
}

export type LessonStringValuesT = {
  name: string;
  date: string;
  from: string;
  to: string;
};

export type GroupT = keyof typeof GroupType;
export type LevelGroupT = keyof typeof GroupLevels;

export type CreateGroup = {
  name: string;
  franchiseId: string;
  type: GroupT;
  teacherId: string;
  level: LevelGroupT;
  courseId: string;
  status: string;
  schedule?: LessonStringValuesT[];
};
export type CreateGroupForServer = {
  dateSince: string;
  dateUntil: string;
} & CreateGroup;

export type CreateGroupFroUI = {
  dateSince: Date;
  dateUntil: Date;
} & CreateGroup;

export type GroupParams = Partial<{
  perPage: number;
  page: number;
  franchiseId: string;
  forGroupId: string;
  type: string;
  teacherId: string;
  name: string;
  level: string;
}>;
export type GroupParamsForUI = Partial<{
  dateSince: Date | string;
  dateUntil: Date | string;
}> &
  GroupParams;
export type GroupParamsForServer = Partial<{
  dateSince: string;
  dateUntil: string;
}> &
  GroupParams;
