import { FranchiseShortT } from 'app/types/FranchiseTypes';

type CreatedAt = {
  date: string;
  timezone_type: number;
  timezone: string;
};
type PayedUntilT = {
  date: string;
  timezone_type: number;
  timezone: string;
};

type TariffT = {
  id: string;
  name: string;
  status: string;
};
export type ReportItemsT = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  franchise: FranchiseShortT;
  new: boolean;
  isActive: boolean;
  isPayed: boolean;
  payedUntil: PayedUntilT;
  tariff: TariffT | null;
  isSecondChild: null;
  createdAt: CreatedAt;

  city: string;
  birthdate: BirthdateType;
  groups: GroupsT;
};

export type groupType = {
  id: string;
  name: string;
  teacher: TeacherType;
  type: string;
};

export type GroupsT = {
  [key: string]: groupType;
};

export type TeacherType = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
};

export type BirthdateType = {
  date: string;
  timezone_type: number;
  timezone: string;
};

export type ReportFilterT = {
  perPage: number;
  isPlayed: boolean;
  isActive: boolean;
  tariffId: string;
  createdUntil: string;
  createdSince: string;
  lastName: string;
  middleName: string;
  firstName: string;
  groupId: string;
  franchiseId: string;
  page: number;
  city: string;
};

export type ReportParams = Partial<{
  perPage: number;
  page: number;
  cityName: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  is_active: string;
  is_payed: string;
  tariff_id: string;
  franchise_id: string;
  group_id: string;
}>;
export type ReportParamsForUI = Partial<{
  date_since: Date | string;
  date_until: Date | string;
}> &
  ReportParams;
