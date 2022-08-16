import { FranchiseShortT, FranchiseT } from 'app/types/FranchiseTypes';
import { GroupT } from 'app/types/GroupT';
import { LevelT } from 'app/types/LevelT';
import { Nullable } from 'app/types/Nullable';
import { ResponseOneUserTypeForLoadMe } from 'app/types/ResponseLoadMeBaseT';
import { ScheduleT } from 'app/types/ScheduleT';
import { StatusT } from 'app/types/StatusT';
import { TimeZoneType } from 'app/types/TimeZoneType';

export type ResponseGroups = {
  id: string;
  name: string;
  type: Nullable<string>;
  status: Nullable<string>;
  level: LevelT;
  startedAt: TimeZoneType;
  endedAt: TimeZoneType;
  createdAt: TimeZoneType;
  franchise: string;
  course: string;
  teacherId: string;
};

type LocalUserT = ResponseOneUserTypeForLoadMe & {
  // course: any[];
  franchise: FranchiseShortT;
  active: boolean;
  payed: boolean;
};

type UsersDataT = {
  id: string;
  stats: StatusT[];
  user: LocalUserT;
};

export type ResponseOneGroup = {
  id: string;
  name: string;
  type: GroupT;
  status: StatusT;
  level: LevelT;
  startedAt: TimeZoneType;
  endedAt: TimeZoneType;
  course: any;
  franchise: FranchiseT;
  users: UsersDataT[];
  schedule: ScheduleT[];
  teacherId: string;
};

export type CreateGroup = {
  name: string;
  franchiseId: string;
  dateSince: string;
  dateUntil: string;
  type: GroupT;
  teacherId: string;
  level: LevelT;
  courseId: string;
  status: StatusT;
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
