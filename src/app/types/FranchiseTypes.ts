import { Nullable } from 'app/types/Nullable';

export type FranchiseShortT = {
  id: string;
  shortName: string;
};

export type FranchiseT = {
  id?: string;
  inn: Nullable<string>;
  legalAddress: Nullable<string>;
  actualAddress: Nullable<string>;
  schoolName: Nullable<string>;
  ogrn: Nullable<string>;
  kpp: Nullable<string>;
  checkingAccount: Nullable<string>;
  phone: Nullable<string>;
  email: Nullable<string>;
  city: Nullable<string>;
  shortName: string;
  bankBill: Nullable<string>;
  bankName: Nullable<string>;
  bankBik: Nullable<string>;
  bankInn: Nullable<string>;
  bankKpp: Nullable<string>;
  isActive?: boolean;
};
