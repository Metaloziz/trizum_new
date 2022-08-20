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
  groups: [];
};
