import { FranchiseShortT } from 'app/types/FranchiseTypes';

type createdAt = {
  date: string;
  timezone_type: number;
  timezone: string;
};
type payedUntilT = {
  date: string;
  timezone_type: number;
  timezone: string;
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
  payedUntil: payedUntilT;
  tariff: null;
  isSecondChild: null;
  createdAt: createdAt;
  groups: [];
};
