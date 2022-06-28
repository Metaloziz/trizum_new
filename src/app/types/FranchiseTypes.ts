export type ResponseFranchise = {
  shortName: string;
  id: string;
};
export type RequestCreateFranchise = {
  fullName: string;
  shortName: string;
  inn: string;
  legalAddress: string;
  actualAddress: string;
  schoolName: string;
  ogrn: string;
  kpp: string;
  checkingAccount: string;
  phone: string;
  email: string;
  city: string;
  bankBill: string;
  bankName: string;
  bankBik: string;
  bankInn: string;
  bankKpp: string;
};
export type Franchise = Partial<RequestCreateFranchise> & ResponseFranchise;
