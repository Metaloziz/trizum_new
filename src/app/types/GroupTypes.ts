import moment from 'moment';

import { TimeZoneType } from 'app/types/TimeZoneType';

import { DateTime } from 'app/enums/DateTime';
import { GroupLevels } from 'app/enums/GroupLevels';
import { GroupTypes } from 'app/enums/GroupTypes';
import { EmptyUser } from 'app/stores/appStore';
import { FranchiseShortT, FranchiseT } from 'app/types/FranchiseTypes';
import { Nullable } from 'app/types/Nullable';
import { ResponseOneUserTypeForLoadMe } from 'app/types/ResponseLoadMeBaseT';
import { ScheduleT } from 'app/types/ScheduleT';
import { StatusT } from 'app/types/StatusT';

export type ResponseGroups = {
  id: string;
  name: string;
  type: Nullable<string>;
  status: Nullable<string>;
  level: LevelGroupT;
  startedAt: TimeZoneType;
  endedAt: TimeZoneType;
  createdAt: TimeZoneType;
  franchise: string;
  course: string;
  teacherId: string;
  schedule: Schedule[];
};

export type WorkT = {
  id: string;
  title: string;
  text: null | string;
  type: string;
  createdAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
};

export type WorksT = {
  id: string;
  index: null | number;
  work: WorkT;
};

export class ResponseOneGroupCourse {
  id = '';

  type = '';

  status = '';

  title = '';

  level = '';

  worksCount = 0;

  createdAt = new TimeZoneType();

  works: any[] = [];
}

type LocalUserT = ResponseOneUserTypeForLoadMe & {
  // course: any[];
  franchise: FranchiseShortT;
  active: boolean;
  payed: boolean;
};

export type UsersDataT = {
  id: string;
  stats: StatusT[];
  user: EmptyUser;
};

export class ResponseOneGroup {
  id: string = '';

  name: string = '';

  type: GroupT = 'blocks';

  status: StatusT = 'draft';

  level: LevelGroupT = 'easy';

  startedAt = new TimeZoneType();

  endedAt = new TimeZoneType();

  franchise = new FranchiseT();

  course = new ResponseOneGroupCourse();

  users: UsersDataT[] = [{ id: '', user: new EmptyUser(), stats: ['draft'] }];

  schedule: ScheduleT[] = [];

  teacherId: string = '';
}
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

export type GroupT = keyof typeof GroupTypes;
export type LevelGroupT = keyof typeof GroupLevels;

export type CreateGroup = {
  name: string;
  franchiseId: string;
  type: GroupT;
  teacherId: string;
  level: LevelGroupT;
  courseId: string;
  status: StatusT;
  schedule?: ScheduleT[];
};
export type CreateGroupForServer = {
  dateSince: string;
  dateUntil: string;
} & CreateGroup;

export type CreateGroupFroUI = {
  dateSince: Date;
  dateUntil: Date;
} & CreateGroup;

export type Schedule = { name: string; date: string; from: string; to: string };

export type ScheduleForUI = {
  franchise: string;
  teacherId: string;
  groupName: string;
  groupId: string;
  lesson: string;
  start: Date;
  end: Date;
  id: number;
};

export type GroupParams = Partial<{
  perPage: number;
  page: number;
  franchiseId: string;
  forGroupId: string;
  type: string;
  teacherId: string;
  name: string;
  level: string;
  schedule: Schedule[];
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
